// src/pages/SmartRemindersPage.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaBell,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaRegClock,
  FaCog,
  FaPlus,
  FaFilter,
  FaSearch,
  FaTrash,
  FaEdit,
  FaEye,
  FaTimes,
  FaSave,
  FaCalendarAlt,
  FaBook,
  FaUser,
  FaFlag,
  FaAlignLeft,
  FaTag,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function SmartRemindersPage() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState([]);
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    today: 0,
    week: 0,
  });

  // New reminder form state
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    due_date: "",
    due_time: "",
    priority: "medium",
    course_id: "",
    task_type: "assignment",
    reminder_before: "3_days",
  });

  // Fetch data on component mount
  useEffect(() => {
    if (currentUser) {
      fetchReminders();
      fetchCourses();
    }
  }, [currentUser]);

  // Filter reminders when filter or search changes
  useEffect(() => {
    filterReminders();
  }, [reminders, filter, searchTerm]);

  const fetchReminders = async () => {
    setLoading(true);
    try {
      // Get all assignments with reminders
      const { data: assignments, error: assignmentsError } = await supabase
        .from("assignments")
        .select(
          `
          *,
          courses (
            course_code,
            course_name,
            color
          ),
          assignment_reminders (*)
        `,
        )
        .eq("user_id", currentUser.id)
        .order("due_date", { ascending: true });

      if (assignmentsError) throw assignmentsError;

      // Get personal tasks
      const { data: personalTasks, error: tasksError } = await supabase
        .from("personal_tasks")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("due_date", { ascending: true });

      if (tasksError) throw tasksError;

      // Transform assignments into reminders
      const assignmentReminders = [];
      assignments?.forEach((assignment) => {
        assignmentReminders.push({
          id: `assign_${assignment.id}`,
          title: assignment.title,
          description:
            assignment.description ||
            `Assignment for ${assignment.courses?.course_code}`,
          due_date: assignment.due_date,
          reminder_type: "assignment",
          priority: assignment.priority,
          status: assignment.status,
          course: assignment.courses,
          task_type: "assignment",
        });

        assignment.assignment_reminders?.forEach((reminder) => {
          assignmentReminders.push({
            id: `remind_${reminder.id}`,
            title: `Reminder: ${assignment.title}`,
            description: getReminderDescription(reminder.reminder_type),
            due_date: reminder.reminder_date,
            reminder_type: reminder.reminder_type,
            priority: assignment.priority,
            sent: reminder.sent,
            course: assignment.courses,
            task_type: "reminder",
          });
        });
      });

      const taskReminders =
        personalTasks?.map((task) => ({
          id: `task_${task.id}`,
          title: task.title,
          description: task.description || "Personal task",
          due_date: task.due_date,
          reminder_type: "personal",
          priority: task.priority,
          status: task.status,
          task_type: "personal",
        })) || [];

      const allReminders = [...assignmentReminders, ...taskReminders];
      setReminders(allReminders);
      calculateStats(allReminders);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("course_code", { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const calculateStats = (reminderList) => {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const weekLater = new Date(now.setDate(now.getDate() + 7));

    const upcoming = reminderList.filter(
      (r) => new Date(r.due_date) > today && r.status !== "completed",
    ).length;

    const todayCount = reminderList.filter((r) => {
      const dueDate = new Date(r.due_date);
      return (
        dueDate.toDateString() === today.toDateString() &&
        r.status !== "completed"
      );
    }).length;

    const weekCount = reminderList.filter((r) => {
      const dueDate = new Date(r.due_date);
      return (
        dueDate >= today && dueDate <= weekLater && r.status !== "completed"
      );
    }).length;

    setStats({
      total: reminderList.length,
      upcoming,
      today: todayCount,
      week: weekCount,
    });
  };

  const filterReminders = () => {
    let filtered = [...reminders];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.description?.toLowerCase().includes(term) ||
          r.course?.course_code?.toLowerCase().includes(term),
      );
    }

    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const weekLater = new Date(now.setDate(now.getDate() + 7));

    switch (filter) {
      case "today":
        filtered = filtered.filter((r) => {
          const dueDate = new Date(r.due_date);
          return (
            dueDate.toDateString() === today.toDateString() &&
            r.status !== "completed"
          );
        });
        break;
      case "week":
        filtered = filtered.filter((r) => {
          const dueDate = new Date(r.due_date);
          return (
            dueDate >= today && dueDate <= weekLater && r.status !== "completed"
          );
        });
        break;
      case "upcoming":
        filtered = filtered.filter(
          (r) => new Date(r.due_date) > today && r.status !== "completed",
        );
        break;
      case "completed":
        filtered = filtered.filter((r) => r.status === "completed");
        break;
      default:
        break;
    }

    setFilteredReminders(filtered);
  };

  const getReminderDescription = (type) => {
    switch (type) {
      case "3_days":
        return "Reminder: Due in 3 days";
      case "1_day":
        return "Reminder: Due tomorrow";
      case "12_hours":
        return "Reminder: Due in 12 hours";
      default:
        return "Reminder";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-[#FF7A7A] text-white";
      case "high":
        return "bg-[#FFB86B] text-white";
      case "medium":
        return "bg-[#4EC5B1] text-white";
      case "low":
        return "bg-[#9A9AA0] text-white";
      default:
        return "bg-[#6B6B70] text-white";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent":
        return <FaExclamationTriangle className="h-4 w-4" />;
      case "high":
        return <FaFlag className="h-4 w-4" />;
      case "medium":
        return <FaFlag className="h-4 w-4" />;
      case "low":
        return <FaFlag className="h-4 w-4" />;
      default:
        return <FaFlag className="h-4 w-4" />;
    }
  };

  const handleAddReminder = async (e) => {
    e.preventDefault();

    try {
      // Combine date and time
      const dueDateTime = new Date(
        `${newReminder.due_date}T${newReminder.due_time || "23:59"}`,
      );

      if (newReminder.task_type === "assignment") {
        const { data: assignment, error } = await supabase
          .from("assignments")
          .insert([
            {
              user_id: currentUser.id,
              course_id: newReminder.course_id || null,
              title: newReminder.title,
              description: newReminder.description,
              due_date: dueDateTime.toISOString(),
              priority: newReminder.priority,
              status: "pending",
            },
          ])
          .select();

        if (error) throw error;
      } else {
        const { data: task, error } = await supabase
          .from("personal_tasks")
          .insert([
            {
              user_id: currentUser.id,
              title: newReminder.title,
              description: newReminder.description,
              due_date: dueDateTime.toISOString(),
              priority: newReminder.priority,
              status: "pending",
              category: "study",
            },
          ])
          .select();

        if (error) throw error;
      }

      setShowAddModal(false);
      setNewReminder({
        title: "",
        description: "",
        due_date: "",
        due_time: "",
        priority: "medium",
        course_id: "",
        task_type: "assignment",
        reminder_before: "3_days",
      });

      fetchReminders();
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  const handleMarkComplete = async (reminder) => {
    try {
      if (
        reminder.source === "assignment" ||
        reminder.source === "assignment_reminder"
      ) {
        const { error } = await supabase
          .from("assignments")
          .update({ status: "completed" })
          .eq(
            "id",
            reminder.source === "assignment"
              ? reminder.id.replace("assign_", "")
              : reminder.assignment_id,
          );

        if (error) throw error;
      } else if (reminder.source === "personal_task") {
        const { error } = await supabase
          .from("personal_tasks")
          .update({ status: "completed" })
          .eq("id", reminder.id.replace("task_", ""));

        if (error) throw error;
      }

      fetchReminders();
    } catch (error) {
      console.error("Error marking reminder as complete:", error);
    }
  };

  const handleDeleteReminder = async (reminder) => {
    if (!confirm("Are you sure you want to delete this reminder?")) return;

    try {
      if (reminder.source === "assignment") {
        const { error } = await supabase
          .from("assignments")
          .delete()
          .eq("id", reminder.id.replace("assign_", ""));

        if (error) throw error;
      } else if (reminder.source === "personal_task") {
        const { error } = await supabase
          .from("personal_tasks")
          .delete()
          .eq("id", reminder.id.replace("task_", ""));

        if (error) throw error;
      }

      fetchReminders();
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    return `${diffDays} days left`;
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] font-outfit">
      <Sidebar />

      <div className="lg:ml-60 min-h-screen pt-18 lg:pt-8 px-5 lg:px-8 pb-8">
        <div className="w-full lg:max-w-7xl lg:mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                Smart Reminders
              </h1>
              <p className="text-[#6B6B70] mt-1">
                Never miss a deadline with intelligent reminders
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all w-fit"
            >
              <FaPlus className="h-4 w-4" />
              <span className="text-sm font-medium">New Reminder</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B6B70]">Total</span>
                <FaBell className="h-4 w-4 text-[#6C63FF]" />
              </div>
              <p className="text-2xl font-bold text-[#111111]">{stats.total}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B6B70]">Today</span>
                <FaClock className="h-4 w-4 text-[#FFB86B]" />
              </div>
              <p className="text-2xl font-bold text-[#111111]">{stats.today}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B6B70]">This Week</span>
                <FaCalendarAlt className="h-4 w-4 text-[#4EC5B1]" />
              </div>
              <p className="text-2xl font-bold text-[#111111]">{stats.week}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B6B70]">Upcoming</span>
                <FaRegCalendarCheck className="h-4 w-4 text-[#6C63FF]" />
              </div>
              <p className="text-2xl font-bold text-[#111111]">
                {stats.upcoming}
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] h-4 w-4" />
              <input
                type="text"
                placeholder="Search reminders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors text-sm min-w-[140px]"
              >
                <option value="all">All Reminders</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>

              <button className="p-3 border-2 border-[#E5E5EA] rounded-2xl bg-white hover:border-[#1C1C1E] transition-colors">
                <FaFilter className="h-4 w-4 text-[#6B6B70]" />
              </button>
            </div>
          </div>

          {/* Reminders List */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-[#1C1C1E] border-t-transparent rounded-full"></div>
              </div>
            ) : filteredReminders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-[#F2F2F7] flex items-center justify-center mx-auto mb-6">
                  <FaBell className="h-10 w-10 text-[#9A9AA0]" />
                </div>
                <h3 className="text-xl font-semibold text-[#111111] mb-2">
                  No reminders found
                </h3>
                <p className="text-[#6B6B70] mb-6">
                  {searchTerm || filter !== "all"
                    ? "Try adjusting your search or filter"
                    : "Create your first reminder to get started"}
                </p>
                {searchTerm || filter !== "all" ? (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilter("all");
                    }}
                    className="px-6 py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all"
                  >
                    Create First Reminder
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center gap-4 p-4 border-2 border-[#E5E5EA] rounded-2xl hover:border-[#1C1C1E] transition-colors group"
                  >
                    <div
                      className="w-1 h-12 rounded-full"
                      style={{
                        backgroundColor: reminder.course?.color || "#6C63FF",
                      }}
                    ></div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {reminder.course && (
                          <span className="text-xs font-medium text-[#6B6B70]">
                            {reminder.course.course_code}
                          </span>
                        )}
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getPriorityColor(reminder.priority)}`}
                        >
                          {getPriorityIcon(reminder.priority)}
                          <span>{reminder.priority}</span>
                        </span>
                        {reminder.status === "completed" && (
                          <span className="text-xs px-2 py-0.5 bg-[#4CAF50] bg-opacity-10 text-[#4CAF50] rounded-full">
                            Completed
                          </span>
                        )}
                      </div>

                      <h3 className="font-semibold text-[#111111]">
                        {reminder.title}
                      </h3>
                      {reminder.description && (
                        <p className="text-sm text-[#6B6B70] mt-1">
                          {reminder.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-[#6B6B70] flex items-center gap-1">
                          <FaClock className="h-3 w-3" />
                          {new Date(
                            reminder.due_date,
                          ).toLocaleDateString()} at{" "}
                          {formatTime(reminder.due_date)}
                        </span>
                        <span className="text-xs font-medium text-[#6C63FF]">
                          {formatDate(reminder.due_date)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {reminder.status !== "completed" && (
                        <button
                          onClick={() => handleMarkComplete(reminder)}
                          className="p-2 hover:bg-[#F2F2F7] rounded-lg transition-colors"
                          title="Mark as complete"
                        >
                          <FaCheckCircle className="h-4 w-4 text-[#4CAF50]" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReminder(reminder)}
                        className="p-2 hover:bg-[#F2F2F7] rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="h-4 w-4 text-[#FF7A7A]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Reminder Modal - Improved Design */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_0_#E5E5EA,0_25px_50px_rgba(0,0,0,0.15)]">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#E5E5EA] p-6 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#111111]">
                    Create New Reminder
                  </h2>
                  <p className="text-sm text-[#6B6B70] mt-1">
                    Set up a smart reminder for your task
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-[#F2F2F7] rounded-lg transition-colors"
                >
                  <FaTimes className="h-5 w-5 text-[#6B6B70]" />
                </button>
              </div>
            </div>

            <form onSubmit={handleAddReminder} className="p-6">
              {/* Task Type Selection - Visual Cards */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[#6B6B70] mb-3">
                  What type of task?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setNewReminder({
                        ...newReminder,
                        task_type: "assignment",
                      })
                    }
                    className={`relative p-6 rounded-2xl border-2 transition-all ${
                      newReminder.task_type === "assignment"
                        ? "border-[#1C1C1E] bg-[#F2F2F7] shadow-[0_4px_0_#1C1C1E]"
                        : "border-[#E5E5EA] hover:border-[#9A9AA0]"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                          newReminder.task_type === "assignment"
                            ? "bg-[#1C1C1E]"
                            : "bg-[#F2F2F7]"
                        }`}
                      >
                        <FaBook
                          className={`h-6 w-6 ${
                            newReminder.task_type === "assignment"
                              ? "text-white"
                              : "text-[#6B6B70]"
                          }`}
                        />
                      </div>
                      <h3
                        className={`font-semibold ${
                          newReminder.task_type === "assignment"
                            ? "text-[#111111]"
                            : "text-[#6B6B70]"
                        }`}
                      >
                        Assignment
                      </h3>
                      <p className="text-xs text-[#9A9AA0] mt-1">
                        Course-related tasks
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setNewReminder({ ...newReminder, task_type: "personal" })
                    }
                    className={`relative p-6 rounded-2xl border-2 transition-all ${
                      newReminder.task_type === "personal"
                        ? "border-[#1C1C1E] bg-[#F2F2F7] shadow-[0_4px_0_#1C1C1E]"
                        : "border-[#E5E5EA] hover:border-[#9A9AA0]"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                          newReminder.task_type === "personal"
                            ? "bg-[#1C1C1E]"
                            : "bg-[#F2F2F7]"
                        }`}
                      >
                        <FaUser
                          className={`h-6 w-6 ${
                            newReminder.task_type === "personal"
                              ? "text-white"
                              : "text-[#6B6B70]"
                          }`}
                        />
                      </div>
                      <h3
                        className={`font-semibold ${
                          newReminder.task_type === "personal"
                            ? "text-[#111111]"
                            : "text-[#6B6B70]"
                        }`}
                      >
                        Personal Task
                      </h3>
                      <p className="text-xs text-[#9A9AA0] mt-1">
                        Self-study & goals
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Two-Column Layout for Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-[#6B6B70] mb-2"
                    >
                      Title <span className="text-[#FF7A7A]">*</span>
                    </label>
                    <div className="relative">
                      <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] h-4 w-4" />
                      <input
                        type="text"
                        id="title"
                        required
                        value={newReminder.title}
                        onChange={(e) =>
                          setNewReminder({
                            ...newReminder,
                            title: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors"
                        placeholder="e.g., Study for exam"
                      />
                    </div>
                  </div>

                  {/* Course (conditional) */}
                  {newReminder.task_type === "assignment" && (
                    <div>
                      <label
                        htmlFor="course"
                        className="block text-sm font-medium text-[#6B6B70] mb-2"
                      >
                        Course
                      </label>
                      <div className="relative">
                        <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] h-4 w-4" />
                        <select
                          id="course"
                          value={newReminder.course_id}
                          onChange={(e) =>
                            setNewReminder({
                              ...newReminder,
                              course_id: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors appearance-none"
                        >
                          <option value="">Select a course (optional)</option>
                          {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.course_code} - {course.course_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Priority - Visual Cards */}
                  <div>
                    <label className="block text-sm font-medium text-[#6B6B70] mb-2">
                      Priority Level
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "low", label: "Low", color: "bg-[#9A9AA0]" },
                        {
                          value: "medium",
                          label: "Medium",
                          color: "bg-[#4EC5B1]",
                        },
                        { value: "high", label: "High", color: "bg-[#FFB86B]" },
                        {
                          value: "urgent",
                          label: "Urgent",
                          color: "bg-[#FF7A7A]",
                        },
                      ].map((priority) => (
                        <button
                          key={priority.value}
                          type="button"
                          onClick={() =>
                            setNewReminder({
                              ...newReminder,
                              priority: priority.value,
                            })
                          }
                          className={`relative p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                            newReminder.priority === priority.value
                              ? "border-[#1C1C1E] bg-[#F2F2F7] shadow-[0_2px_0_#1C1C1E]"
                              : "border-[#E5E5EA] hover:border-[#9A9AA0]"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${priority.color}`}
                          ></div>
                          <span
                            className={`text-sm font-medium ${
                              newReminder.priority === priority.value
                                ? "text-[#111111]"
                                : "text-[#6B6B70]"
                            }`}
                          >
                            {priority.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Due Date */}
                  <div>
                    <label
                      htmlFor="due_date"
                      className="block text-sm font-medium text-[#6B6B70] mb-2"
                    >
                      Due Date <span className="text-[#FF7A7A]">*</span>
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] h-4 w-4" />
                      <input
                        type="date"
                        id="due_date"
                        required
                        value={newReminder.due_date}
                        onChange={(e) =>
                          setNewReminder({
                            ...newReminder,
                            due_date: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Due Time */}
                  <div>
                    <label
                      htmlFor="due_time"
                      className="block text-sm font-medium text-[#6B6B70] mb-2"
                    >
                      Due Time
                    </label>
                    <div className="relative">
                      <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] h-4 w-4" />
                      <input
                        type="time"
                        id="due_time"
                        value={newReminder.due_time}
                        onChange={(e) =>
                          setNewReminder({
                            ...newReminder,
                            due_time: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Reminder Before */}
                  <div>
                    <label
                      htmlFor="reminder_before"
                      className="block text-sm font-medium text-[#6B6B70] mb-2"
                    >
                      Remind me
                    </label>
                    <div className="relative">
                      <FaBell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] h-4 w-4" />
                      <select
                        id="reminder_before"
                        value={newReminder.reminder_before}
                        onChange={(e) =>
                          setNewReminder({
                            ...newReminder,
                            reminder_before: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="3_days">3 days before</option>
                        <option value="1_day">1 day before</option>
                        <option value="12_hours">12 hours before</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description - Full Width */}
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-[#6B6B70] mb-2"
                >
                  Description
                </label>
                <div className="relative">
                  <FaAlignLeft className="absolute left-3 top-3 text-[#9A9AA0] h-4 w-4" />
                  <textarea
                    id="description"
                    value={newReminder.description}
                    onChange={(e) =>
                      setNewReminder({
                        ...newReminder,
                        description: e.target.value,
                      })
                    }
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors resize-none"
                    placeholder="Add any additional details about this task..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-[#E5E5EA]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border-2 border-[#E5E5EA] rounded-2xl text-[#6B6B70] font-medium hover:bg-[#F2F2F7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1C1C1E] text-white rounded-2xl font-medium shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all"
                >
                  Create Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
