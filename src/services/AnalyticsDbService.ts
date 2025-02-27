
import { GameAnalytics } from './xAPIService';

// This is a mock database service for demo purposes
// In a real application, you would integrate with a real database
class AnalyticsDbService {
  private analytics: GameAnalytics[] = [];
  
  // Save analytics to database
  async saveAnalytics(analytics: GameAnalytics): Promise<GameAnalytics> {
    // Check if this is an update to existing analytics
    const existingIndex = this.analytics.findIndex(a => a.id === analytics.id);
    
    if (existingIndex >= 0) {
      // Update existing record
      this.analytics[existingIndex] = {
        ...this.analytics[existingIndex],
        ...analytics,
        updatedAt: new Date().toISOString()
      };
      return this.analytics[existingIndex];
    } else {
      // Add new record
      this.analytics.push(analytics);
      return analytics;
    }
  }
  
  // Get analytics by ID
  async getAnalyticsById(id: string): Promise<GameAnalytics | null> {
    const found = this.analytics.find(a => a.id === id);
    return found || null;
  }
  
  // Get all analytics for a user
  async getAnalyticsByUser(userId: string): Promise<GameAnalytics[]> {
    return this.analytics.filter(a => a.userId === userId);
  }
  
  // Get all analytics for a game
  async getAnalyticsByGame(gameId: string): Promise<GameAnalytics[]> {
    return this.analytics.filter(a => a.gameId === gameId);
  }
  
  // Get all analytics for a school
  async getAnalyticsBySchool(schoolId: string): Promise<GameAnalytics[]> {
    return this.analytics.filter(a => a.schoolId === schoolId);
  }
  
  // Get analytics by grade level
  async getAnalyticsByGrade(gradeLevel: string): Promise<GameAnalytics[]> {
    return this.analytics.filter(a => a.gradeLevel === gradeLevel);
  }
  
  // Get analytics by subject
  async getAnalyticsBySubject(subject: string): Promise<GameAnalytics[]> {
    return this.analytics.filter(a => a.subject === subject);
  }
  
  // Get analytics for a date range
  async getAnalyticsByDateRange(startDate: string, endDate: string): Promise<GameAnalytics[]> {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    
    return this.analytics.filter(a => {
      const createdAt = new Date(a.createdAt).getTime();
      return createdAt >= start && createdAt <= end;
    });
  }
  
  // Get aggregate statistics for all games
  async getAggregateStats(): Promise<{
    totalSessions: number;
    averageScore: number;
    averageTimeSpent: string;
    completionRate: number;
    passRate: number;
  }> {
    const totalSessions = this.analytics.length;
    
    if (totalSessions === 0) {
      return {
        totalSessions: 0,
        averageScore: 0,
        averageTimeSpent: '00:00:00',
        completionRate: 0,
        passRate: 0
      };
    }
    
    // Calculate average score
    const scores = this.analytics.filter(a => a.percentageScore !== undefined)
      .map(a => a.percentageScore as number);
    const averageScore = scores.length > 0
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0;
    
    // Calculate average time spent
    // This is simplified - in a real implementation you'd parse the time strings properly
    const totalSeconds = this.analytics.reduce((sum, a) => {
      if (!a.totalTimeSpent) return sum;
      
      // Parse SCORM time format (typically HH:MM:SS)
      const parts = a.totalTimeSpent.split(':');
      if (parts.length !== 3) return sum;
      
      const hours = parseInt(parts[0], 10) || 0;
      const minutes = parseInt(parts[1], 10) || 0;
      const seconds = parseInt(parts[2], 10) || 0;
      
      return sum + (hours * 3600 + minutes * 60 + seconds);
    }, 0);
    
    const avgSeconds = totalSessions > 0 ? totalSeconds / totalSessions : 0;
    const avgHours = Math.floor(avgSeconds / 3600);
    const avgMinutes = Math.floor((avgSeconds % 3600) / 60);
    const avgSecondsRemainder = Math.floor(avgSeconds % 60);
    
    const averageTimeSpent = `${avgHours.toString().padStart(2, '0')}:${avgMinutes.toString().padStart(2, '0')}:${avgSecondsRemainder.toString().padStart(2, '0')}`;
    
    // Calculate completion rate
    const completedSessions = this.analytics.filter(a => a.completed).length;
    const completionRate = (completedSessions / totalSessions) * 100;
    
    // Calculate pass rate
    const passedSessions = this.analytics.filter(a => a.passed).length;
    const passRate = (passedSessions / totalSessions) * 100;
    
    return {
      totalSessions,
      averageScore,
      averageTimeSpent,
      completionRate,
      passRate
    };
  }
  
  // Get user rankings by score
  async getUserRankings(limit: number = 10): Promise<Array<{
    userId: string;
    userName: string;
    averageScore: number;
    totalSessions: number;
  }>> {
    // Group analytics by user
    const userMap = new Map<string, {
      userId: string;
      userName: string;
      scores: number[];
      sessions: number;
    }>();
    
    for (const a of this.analytics) {
      if (!a.percentageScore) continue;
      
      if (!userMap.has(a.userId)) {
        userMap.set(a.userId, {
          userId: a.userId,
          userName: a.userName,
          scores: [],
          sessions: 0
        });
      }
      
      const user = userMap.get(a.userId)!;
      user.scores.push(a.percentageScore);
      user.sessions++;
    }
    
    // Calculate average scores and sort
    const rankings = Array.from(userMap.values())
      .map(user => ({
        userId: user.userId,
        userName: user.userName,
        averageScore: user.scores.reduce((sum, score) => sum + score, 0) / user.scores.length,
        totalSessions: user.sessions
      }))
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, limit);
    
    return rankings;
  }
  
  // Get school rankings by average score
  async getSchoolRankings(limit: number = 10): Promise<Array<{
    schoolId: string;
    schoolName: string;
    averageScore: number;
    totalStudents: number;
    totalSessions: number;
  }>> {
    // Group analytics by school
    const schoolMap = new Map<string, {
      schoolId: string;
      schoolName: string;
      scores: number[];
      users: Set<string>;
      sessions: number;
    }>();
    
    for (const a of this.analytics) {
      if (!a.schoolId || !a.percentageScore) continue;
      
      if (!schoolMap.has(a.schoolId)) {
        schoolMap.set(a.schoolId, {
          schoolId: a.schoolId,
          schoolName: a.schoolName || 'Unknown School',
          scores: [],
          users: new Set(),
          sessions: 0
        });
      }
      
      const school = schoolMap.get(a.schoolId)!;
      school.scores.push(a.percentageScore);
      school.users.add(a.userId);
      school.sessions++;
    }
    
    // Calculate average scores and sort
    const rankings = Array.from(schoolMap.values())
      .map(school => ({
        schoolId: school.schoolId,
        schoolName: school.schoolName,
        averageScore: school.scores.reduce((sum, score) => sum + score, 0) / school.scores.length,
        totalStudents: school.users.size,
        totalSessions: school.sessions
      }))
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, limit);
    
    return rankings;
  }
}

export default AnalyticsDbService;
