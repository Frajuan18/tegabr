// src/pages/WorkloadAwarenessPage.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { 
  FaChartLine, 
  FaCalendarAlt, 
  FaClock, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaRegClock,
  FaBrain,
  FaHeartbeat,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaEye,
  FaBell,
  FaBook,
  FaTasks
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function WorkloadAwarenessPage() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [workloadData, setWorkloadData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [insights, setInsights] = useState({
    currentLoad: "low",
    trend: "stable",
    peakDay: null,
    freeDay: null,
    recommendations: []
  });

  useEffect(() => {
    if (currentUser) {
      fetchWorkloadData();
    }
  }, [currentUser]);

  const fetchWorkloadData = async () => {
    setLoading(true);
    try {
      // Get all assignments
      const { data: assignments, error: assignmentsError } = await supabase
        .from('assignments')
        .select(`
          *,
          courses (
            course_code,
            course_name,
            color
          )
        `)
        .eq('user_id', currentUser.id)
        .order('due_date', { ascending: true });

      if (assignmentsError) throw assignmentsError;

      // Get personal tasks
      const { data: tasks, error: tasksError } = await supabase
        .from('personal_tasks')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('due_date', { ascending: true });

      if (tasksError) throw tasksError;

      // Process workload data
      const processed = processWorkloadData(assignments || [], tasks || []);
      setWorkloadData(processed);
      
      // Set current week
      const now = new Date();
      const currentWeekStart = getWeekStart(now);
      const currentWeekData = processed.find(w => 
        new Date(w.weekStart).toDateString() === currentWeekStart.toDateString()
      );
      
      if (currentWeekData) {
        setCurrentWeek(currentWeekData);
        setSelectedWeek(currentWeekData);
        generateInsights(currentWeekData, processed);
      }

    } catch (error) {
      console.error("Error fetching workload data:", error);
    } finally {
      setLoading(false);
    }
  };

  const processWorkloadData = (assignments, tasks) => {
    const weeks = new Map();
    const now = new Date();

    // Process assignments
    assignments.forEach(assignment => {
      if (assignment.status === 'completed') return;
      
      const dueDate = new Date(assignment.due_date);
      const weekStart = getWeekStart(dueDate);
      const weekKey = weekStart.toISOString();

      if (!weeks.has(weekKey)) {
        weeks.set(weekKey, {
          weekStart,
          weekEnd: new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000),
          assignments: [],
          tasks: [],
          totalItems: 0,
          totalHours: 0,
          priorityBreakdown: { low: 0, medium: 0, high: 0, urgent: 0 },
          dailyBreakdown: Array(7).fill().map(() => ({ count: 0, hours: 0 }))
        });
      }

      const weekData = weeks.get(weekKey);
      const dayIndex = dueDate.getDay();
      
      // Estimate hours based on priority and type
      const estimatedHours = estimateHours(assignment);
      
      weekData.assignments.push(assignment);
      weekData.totalItems++;
      weekData.totalHours += estimatedHours;
      weekData.priorityBreakdown[assignment.priority] = 
        (weekData.priorityBreakdown[assignment.priority] || 0) + 1;
      weekData.dailyBreakdown[dayIndex].count++;
      weekData.dailyBreakdown[dayIndex].hours += estimatedHours;
    });

    // Process tasks
    tasks.forEach(task => {
      if (task.status === 'completed' || !task.due_date) return;
      
      const dueDate = new Date(task.due_date);
      const weekStart = getWeekStart(dueDate);
      const weekKey = weekStart.toISOString();

      if (!weeks.has(weekKey)) {
        weeks.set(weekKey, {
          weekStart,
          weekEnd: new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000),
          assignments: [],
          tasks: [],
          totalItems: 0,
          totalHours: 0,
          priorityBreakdown: { low: 0, medium: 0, high: 0, urgent: 0 },
          dailyBreakdown: Array(7).fill().map(() => ({ count: 0, hours: 0 }))
        });
      }

      const weekData = weeks.get(weekKey);
      const dayIndex = dueDate.getDay();
      const estimatedHours = task.estimated_duration ? task.estimated_duration / 60 : 2; // Convert minutes to hours, default 2

      weekData.tasks.push(task);
      weekData.totalItems++;
      weekData.totalHours += estimatedHours;
      weekData.priorityBreakdown[task.priority] = 
        (weekData.priorityBreakdown[task.priority] || 0) + 1;
      weekData.dailyBreakdown[dayIndex].count++;
      weekData.dailyBreakdown[dayIndex].hours += estimatedHours;
    });

    // Calculate workload level for each week
    const sortedWeeks = Array.from(weeks.values()).sort((a, b) => 
      a.weekStart - b.weekStart
    );

    sortedWeeks.forEach(week => {
      week.workloadLevel = calculateWorkloadLevel(week.totalHours);
      week.busiestDay = findBusiestDay(week.dailyBreakdown);
      week.freestDay = findFreestDay(week.dailyBreakdown);
    });

    return sortedWeeks;
  };

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const estimateHours = (assignment) => {
    // Estimate hours based on priority and type
    const baseHours = {
      'urgent': 8,
      'high': 5,
      'medium': 3,
      'low': 2
    };
    return baseHours[assignment.priority] || 3;
  };

  const calculateWorkloadLevel = (totalHours) => {
    if (totalHours <= 5) return 'low';
    if (totalHours <= 15) return 'medium';
    if (totalHours <= 25) return 'high';
    return 'very high';
  };

  const findBusiestDay = (dailyBreakdown) => {
    let maxIndex = 0;
    let maxHours = 0;
    dailyBreakdown.forEach((day, index) => {
      if (day.hours > maxHours) {
        maxHours = day.hours;
        maxIndex = index;
      }
    });
    return { dayIndex: maxIndex, hours: maxHours };
  };

  const findFreestDay = (dailyBreakdown) => {
    let minIndex = 0;
    let minHours = Infinity;
    dailyBreakdown.forEach((day, index) => {
      if (day.hours < minHours) {
        minHours = day.hours;
        minIndex = index;
      }
    });
    return { dayIndex: minIndex, hours: minHours };
  };

  const generateInsights = (weekData, allWeeks) => {
    if (!weekData) return;

    const now = new Date();
    const currentWeekStart = getWeekStart(now);
    const weekIndex = allWeeks.findIndex(w => 
      new Date(w.weekStart).toDateString() === currentWeekStart.toDateString()
    );

    const recommendations = [];

    // Workload level recommendation
    if (weekData.workloadLevel === 'very high') {
      recommendations.push({
        type: 'warning',
        icon: FaExclamationTriangle,
        text: 'Extremely busy week ahead. Consider starting some tasks early or delegating.'
      });
    } else if (weekData.workloadLevel === 'high') {
      recommendations.push({
        type: 'alert',
        icon: FaClock,
        text: 'Heavy workload this week. Plan your time carefully and prioritize urgent tasks.'
      });
    } else if (weekData.workloadLevel === 'medium') {
      recommendations.push({
        type: 'info',
        icon: FaBrain,
        text: 'Manageable workload. Stay organized and you\'ll get through it.'
      });
    } else {
      recommendations.push({
        type: 'success',
        icon: FaCheckCircle,
        text: 'Light week! Great time to get ahead on future assignments.'
      });
    }

    // Peak day recommendation
    if (weekData.busiestDay) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      recommendations.push({
        type: 'info',
        icon: FaCalendarAlt,
        text: `${days[weekData.busiestDay.dayIndex]} is your busiest day with ${weekData.busiestDay.hours.toFixed(1)} hours of work.`
      });
    }

    // Free day recommendation
    if (weekData.freestDay) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      recommendations.push({
        type: 'success',
        icon: FaHeartbeat,
        text: `${days[weekData.freestDay.dayIndex]} is lighter. Use it to rest or get ahead.`
      });
    }

    // Priority breakdown
    if (weekData.priorityBreakdown.urgent > 0) {
      recommendations.push({
        type: 'warning',
        icon: FaExclamationTriangle,
        text: `${weekData.priorityBreakdown.urgent} urgent ${weekData.priorityBreakdown.urgent === 1 ? 'task' : 'tasks'} this week. Handle these first.`
      });
    }

    // Trend analysis
    let trend = 'stable';
    if (weekIndex > 0) {
      const prevWeek = allWeeks[weekIndex - 1];
      if (prevWeek) {
        if (weekData.totalHours > prevWeek.totalHours * 1.2) {
          trend = 'increasing';
          recommendations.push({
            type: 'alert',
            icon: FaArrowUp,
            text: `Workload is increasing compared to last week. Start planning ahead.`
          });
        } else if (weekData.totalHours < prevWeek.totalHours * 0.8) {
          trend = 'decreasing';
          recommendations.push({
            type: 'success',
            icon: FaArrowDown,
            text: `Workload is decreasing. Great time to catch up!`
          });
        }
      }
    }

    // Future week alerts
    if (weekIndex < allWeeks.length - 1) {
      const nextWeek = allWeeks[weekIndex + 1];
      if (nextWeek && nextWeek.workloadLevel === 'very high') {
        recommendations.push({
          type: 'warning',
          icon: FaBell,
          text: `Next week will be very busy (${nextWeek.totalHours.toFixed(1)} hours). Start preparing now.`
        });
      }
    }

    setInsights({
      currentLoad: weekData.workloadLevel,
      trend,
      peakDay: weekData.busiestDay,
      freeDay: weekData.freestDay,
      recommendations
    });
  };

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
    generateInsights(week, workloadData);
  };

  const getWorkloadColor = (level) => {
    switch(level) {
      case 'low': return 'bg-[#4CAF50]';
      case 'medium': return 'bg-[#FFB86B]';
      case 'high': return 'bg-[#FF7A7A]';
      case 'very high': return 'bg-[#FF4D4D]';
      default: return 'bg-[#9A9AA0]';
    }
  };

  const getWorkloadTextColor = (level) => {
    switch(level) {
      case 'low': return 'text-[#4CAF50]';
      case 'medium': return 'text-[#FFB86B]';
      case 'high': return 'text-[#FF7A7A]';
      case 'very high': return 'text-[#FF4D4D]';
      default: return 'text-[#9A9AA0]';
    }
  };

  const getTrendIcon = () => {
    switch(insights.trend) {
      case 'increasing': return <FaArrowUp className="h-4 w-4 text-[#FF7A7A]" />;
      case 'decreasing': return <FaArrowDown className="h-4 w-4 text-[#4CAF50]" />;
      default: return <FaMinus className="h-4 w-4 text-[#9A9AA0]" />;
    }
  };

  const formatWeekRange = (weekStart, weekEnd) => {
    const start = new Date(weekStart);
    const end = new Date(weekEnd);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-[#F2F2F7] font-outfit">
      <Sidebar />
      
      <div className="lg:ml-72 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">Workload Awareness</h1>
            <p className="text-[#6B6B70] mt-1">Understand your busy weeks and plan ahead</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-[#1C1C1E] border-t-transparent rounded-full"></div>
            </div>
          ) : workloadData.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
              <div className="text-center max-w-md mx-auto">
                <div className="w-20 h-20 rounded-3xl bg-[#F2F2F7] flex items-center justify-center mx-auto mb-6">
                  <FaChartLine className="h-10 w-10 text-[#9A9AA0]" />
                </div>
                <h3 className="text-xl font-semibold text-[#111111] mb-2">No workload data yet</h3>
                <p className="text-[#6B6B70] mb-6">
                  Add assignments and tasks to see your workload analysis and get insights on your busy weeks.
                </p>
                <button className="px-6 py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all">
                  Add Your First Task
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Current Workload Card */}
              {currentWeek && (
                <div className="bg-white rounded-3xl p-6 mb-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[#111111]">Current Week</h2>
                      <p className="text-sm text-[#6B6B70]">{formatWeekRange(currentWeek.weekStart, currentWeek.weekEnd)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getWorkloadColor(currentWeek.workloadLevel)} text-white`}>
                        {currentWeek.workloadLevel.toUpperCase()}
                      </span>
                      {getTrendIcon()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-[#F2F2F7] rounded-xl p-4">
                      <p className="text-sm text-[#6B6B70] mb-1">Total Tasks</p>
                      <p className="text-2xl font-bold text-[#111111]">{currentWeek.totalItems}</p>
                    </div>
                    <div className="bg-[#F2F2F7] rounded-xl p-4">
                      <p className="text-sm text-[#6B6B70] mb-1">Estimated Hours</p>
                      <p className="text-2xl font-bold text-[#111111]">{currentWeek.totalHours.toFixed(1)}h</p>
                    </div>
                    <div className="bg-[#F2F2F7] rounded-xl p-4">
                      <p className="text-sm text-[#6B6B70] mb-1">Priority Breakdown</p>
                      <div className="flex gap-2 mt-1">
                        {Object.entries(currentWeek.priorityBreakdown).map(([priority, count]) => (
                          count > 0 && (
                            <div key={priority} className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${
                                priority === 'urgent' ? 'bg-[#FF7A7A]' :
                                priority === 'high' ? 'bg-[#FFB86B]' :
                                priority === 'medium' ? 'bg-[#4EC5B1]' :
                                'bg-[#9A9AA0]'
                              }`}></div>
                              <span className="text-xs text-[#6B6B70]">{count}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Daily Breakdown */}
                  <div>
                    <p className="text-sm font-medium text-[#111111] mb-3">Daily Distribution</p>
                    <div className="grid grid-cols-7 gap-2">
                      {currentWeek.dailyBreakdown.map((day, index) => (
                        <div key={index} className="text-center">
                          <p className="text-xs text-[#6B6B70] mb-1">{days[index]}</p>
                          <div className="h-20 bg-[#F2F2F7] rounded-lg relative overflow-hidden">
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#6C63FF] to-[#4EC5B1] transition-all duration-300"
                              style={{ height: `${Math.min((day.hours / 8) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs font-medium text-[#111111] mt-1">{day.hours.toFixed(1)}h</p>
                          <p className="text-xs text-[#6B6B70]">{day.count} tasks</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Insights & Recommendations */}
              {insights.recommendations.length > 0 && (
                <div className="bg-white rounded-3xl p-6 mb-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
                  <h2 className="text-lg font-semibold text-[#111111] mb-4">📊 Insights & Recommendations</h2>
                  <div className="space-y-3">
                    {insights.recommendations.map((rec, index) => {
                      const Icon = rec.icon;
                      return (
                        <div 
                          key={index}
                          className={`flex items-start gap-3 p-3 rounded-xl ${
                            rec.type === 'warning' ? 'bg-[#FF7A7A] bg-opacity-10' :
                            rec.type === 'alert' ? 'bg-[#FFB86B] bg-opacity-10' :
                            rec.type === 'success' ? 'bg-[#4CAF50] bg-opacity-10' :
                            'bg-[#F2F2F7]'
                          }`}
                        >
                          <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                            rec.type === 'warning' ? 'text-[#FF7A7A]' :
                            rec.type === 'alert' ? 'text-[#FFB86B]' :
                            rec.type === 'success' ? 'text-[#4CAF50]' :
                            'text-[#6C63FF]'
                          }`} />
                          <p className="text-sm text-[#111111]">{rec.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Week Timeline */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
                <h2 className="text-lg font-semibold text-[#111111] mb-4">📅 Upcoming Weeks</h2>
                <div className="space-y-3">
                  {workloadData.map((week, index) => {
                    const isSelected = selectedWeek && 
                      new Date(week.weekStart).toDateString() === new Date(selectedWeek.weekStart).toDateString();
                    
                    return (
                      <div
                        key={index}
                        onClick={() => handleWeekSelect(week)}
                        className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-[#1C1C1E] bg-[#F2F2F7]' 
                            : 'border-[#E5E5EA] hover:border-[#9A9AA0]'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-1 h-12 rounded-full ${getWorkloadColor(week.workloadLevel)}`}></div>
                          <div>
                            <p className="font-medium text-[#111111]">{formatWeekRange(week.weekStart, week.weekEnd)}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-[#6B6B70]">{week.totalItems} tasks</span>
                              <span className="text-xs text-[#6B6B70]">•</span>
                              <span className="text-xs text-[#6B6B70]">{week.totalHours.toFixed(1)} hours</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-medium ${getWorkloadTextColor(week.workloadLevel)}`}>
                            {week.workloadLevel.toUpperCase()}
                          </span>
                          <FaEye className={`h-4 w-4 ${isSelected ? 'text-[#1C1C1E]' : 'text-[#9A9AA0]'}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}