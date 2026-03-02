// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Your Supabase project URL and anon key
const supabaseUrl = 'https://aybgunhleywzdvflzoez.supabase.co'
const supabaseAnonKey = 'sb_publishable_h1A34xn72f58A8nvwg3lNw_WeN-8JB_'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper function to get user profile
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

// Helper function to sign up
export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: userData.username,
        full_name: userData.fullName,
        phone: userData.phone,
      }
    }
  })
  
  if (error) throw error
  return data
}

// Helper function to sign in
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

// Helper function to sign in with Google
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    }
  })
  
  if (error) throw error
  return data
}

// Helper function to sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Helper function to reset password
export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  
  if (error) throw error
  return data
}

// Helper function to update password
export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })
  
  if (error) throw error
  return data
}

// ============================================
// ASSIGNMENTS API
// ============================================

// Get assignments for current user
export const getAssignments = async (userId, startDate, endDate) => {
  let query = supabase
    .from('assignments')
    .select(`
      *,
      courses (
        course_code,
        course_name,
        color
      )
    `)
    .eq('user_id', userId)
    .order('due_date', { ascending: true })
  
  if (startDate && endDate) {
    query = query
      .gte('due_date', startDate.toISOString())
      .lte('due_date', endDate.toISOString())
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}

// Create new assignment
export const createAssignment = async (assignmentData) => {
  const { data, error } = await supabase
    .from('assignments')
    .insert([assignmentData])
    .select()
  
  if (error) throw error
  return data[0]
}

// Update assignment
export const updateAssignment = async (id, updates) => {
  const { data, error } = await supabase
    .from('assignments')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0]
}

// Delete assignment
export const deleteAssignment = async (id) => {
  const { error } = await supabase
    .from('assignments')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// ============================================
// COURSES API
// ============================================

// Get courses for current user
export const getCourses = async (userId) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('user_id', userId)
    .order('course_code', { ascending: true })
  
  if (error) throw error
  return data
}

// Create new course
export const createCourse = async (courseData) => {
  const { data, error } = await supabase
    .from('courses')
    .insert([courseData])
    .select()
  
  if (error) throw error
  return data[0]
}

// Update course
export const updateCourse = async (id, updates) => {
  const { data, error } = await supabase
    .from('courses')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0]
}

// Delete course
export const deleteCourse = async (id) => {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// ============================================
// PERSONAL TASKS API
// ============================================

// Get personal tasks for current user
export const getPersonalTasks = async (userId, startDate, endDate) => {
  let query = supabase
    .from('personal_tasks')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: true })
  
  if (startDate && endDate) {
    query = query
      .gte('due_date', startDate.toISOString())
      .lte('due_date', endDate.toISOString())
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}

// Create new personal task
export const createPersonalTask = async (taskData) => {
  const { data, error } = await supabase
    .from('personal_tasks')
    .insert([taskData])
    .select()
  
  if (error) throw error
  return data[0]
}

// Update personal task
export const updatePersonalTask = async (id, updates) => {
  const { data, error } = await supabase
    .from('personal_tasks')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0]
}

// Delete personal task
export const deletePersonalTask = async (id) => {
  const { error } = await supabase
    .from('personal_tasks')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// ============================================
// STUDY PLANS API
// ============================================

// Get study plans for current user
export const getStudyPlans = async (userId) => {
  const { data, error } = await supabase
    .from('study_plans')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('start_date', { ascending: true })
  
  if (error) throw error
  return data
}

// Create study plan
export const createStudyPlan = async (planData) => {
  const { data, error } = await supabase
    .from('study_plans')
    .insert([planData])
    .select()
  
  if (error) throw error
  return data[0]
}

// Get study sessions for a plan
export const getStudySessions = async (planId) => {
  const { data, error } = await supabase
    .from('study_sessions')
    .select(`
      *,
      assignments (title, course_id, courses (course_code)),
      personal_tasks (title)
    `)
    .eq('study_plan_id', planId)
    .order('scheduled_date', { ascending: true })
  
  if (error) throw error
  return data
}

// Create study session
export const createStudySession = async (sessionData) => {
  const { data, error } = await supabase
    .from('study_sessions')
    .insert([sessionData])
    .select()
  
  if (error) throw error
  return data[0]
}

// ============================================
// NOTIFICATIONS API
// ============================================

// Get notifications for current user
export const getNotifications = async (userId) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50)
  
  if (error) throw error
  return data
}

// Mark notification as read
export const markNotificationRead = async (id) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0]
}

// Mark all notifications as read
export const markAllNotificationsRead = async (userId) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
    .eq('is_read', false)
  
  if (error) throw error
}

// ============================================
// PROGRESS TRACKING API
// ============================================

// Get progress logs for current user
export const getProgressLogs = async (userId, startDate, endDate) => {
  let query = supabase
    .from('progress_logs')
    .select('*')
    .eq('user_id', userId)
    .order('log_date', { ascending: false })
  
  if (startDate && endDate) {
    query = query
      .gte('log_date', startDate.toISOString().split('T')[0])
      .lte('log_date', endDate.toISOString().split('T')[0])
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}

// Create or update progress log
export const upsertProgressLog = async (logData) => {
  const { data, error } = await supabase
    .from('progress_logs')
    .upsert([logData], { onConflict: 'user_id, log_date' })
    .select()
  
  if (error) throw error
  return data[0]
}

// Get stress indicators
export const getStressIndicators = async (userId) => {
  const { data, error } = await supabase
    .from('stress_indicators')
    .select('*')
    .eq('user_id', userId)
    .order('week_start', { ascending: false })
    .limit(10)
  
  if (error) throw error
  return data
}

// ============================================
// STUDY GROUPS API
// ============================================

// Get user's study groups
export const getUserGroups = async (userId) => {
  const { data, error } = await supabase
    .from('group_members')
    .select(`
      group_id,
      role,
      study_groups (*)
    `)
    .eq('user_id', userId)
  
  if (error) throw error
  return data.map(item => ({
    ...item.study_groups,
    member_role: item.role
  }))
}

// Create study group
export const createStudyGroup = async (groupData) => {
  const { data, error } = await supabase
    .from('study_groups')
    .insert([groupData])
    .select()
  
  if (error) throw error
  return data[0]
}

// Join study group with invite code
export const joinStudyGroup = async (inviteCode, userId) => {
  // First get the group
  const { data: group, error: groupError } = await supabase
    .from('study_groups')
    .select('id')
    .eq('invite_code', inviteCode)
    .single()
  
  if (groupError) throw new Error('Invalid invite code')
  
  // Then add user as member
  const { data, error } = await supabase
    .from('group_members')
    .insert([{
      group_id: group.id,
      user_id: userId,
      role: 'member'
    }])
    .select()
  
  if (error) throw error
  return data[0]
}

// Get group tasks
export const getGroupTasks = async (groupId) => {
  const { data, error } = await supabase
    .from('group_tasks')
    .select(`
      *,
      profiles:assigned_to (
        username,
        full_name
      )
    `)
    .eq('group_id', groupId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// ============================================
// DASHBOARD STATS API
// ============================================

// Get dashboard statistics
export const getDashboardStats = async (userId) => {
  const now = new Date()
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))
  const endOfDay = new Date(now.setHours(23, 59, 59, 999))
  
  // Get today's assignments
  const { data: todayAssignments } = await supabase
    .from('assignments')
    .select('*')
    .eq('user_id', userId)
    .gte('due_date', startOfDay.toISOString())
    .lte('due_date', endOfDay.toISOString())
  
  // Get overdue assignments
  const { data: overdueAssignments } = await supabase
    .from('assignments')
    .select('*')
    .eq('user_id', userId)
    .lt('due_date', new Date().toISOString())
    .neq('status', 'completed')
  
  // Get upcoming assignments (next 7 days)
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  
  const { data: upcomingAssignments } = await supabase
    .from('assignments')
    .select('*')
    .eq('user_id', userId)
    .gte('due_date', new Date().toISOString())
    .lte('due_date', nextWeek.toISOString())
    .neq('status', 'completed')
  
  // Get total courses
  const { count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
  
  return {
    todayTasks: todayAssignments?.length || 0,
    overdue: overdueAssignments?.length || 0,
    upcoming: upcomingAssignments?.length || 0,
    totalCourses: totalCourses || 0
  }
}