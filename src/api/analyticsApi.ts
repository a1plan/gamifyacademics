
import XAPIService, { XAPIStatement, SCORMData, GameAnalytics } from '../services/xAPIService';
import AnalyticsDbService from '../services/AnalyticsDbService';

// Initialize services
const xapiService = new XAPIService();
const dbService = new AnalyticsDbService();

// Process xAPI statement
export async function processXAPIStatement(statement: XAPIStatement): Promise<GameAnalytics> {
  try {
    // Process the statement
    const analytics = await xapiService.processXAPIStatement(statement);
    
    // Save to database
    return dbService.saveAnalytics(analytics);
  } catch (error) {
    console.error('Error processing xAPI statement:', error);
    throw error;
  }
}

// Process SCORM data
export async function processSCORMData(data: SCORMData, gameId: string, gameName: string): Promise<GameAnalytics> {
  try {
    // Process the data
    const analytics = await xapiService.processSCORMData(data, gameId, gameName);
    
    // Save to database
    return dbService.saveAnalytics(analytics);
  } catch (error) {
    console.error('Error processing SCORM data:', error);
    throw error;
  }
}

// Get analytics by user
export async function getAnalyticsByUser(userId: string): Promise<GameAnalytics[]> {
  return dbService.getAnalyticsByUser(userId);
}

// Get analytics by game
export async function getAnalyticsByGame(gameId: string): Promise<GameAnalytics[]> {
  return dbService.getAnalyticsByGame(gameId);
}

// Get analytics by school
export async function getAnalyticsBySchool(schoolId: string): Promise<GameAnalytics[]> {
  return dbService.getAnalyticsBySchool(schoolId);
}

// Get aggregate statistics
export async function getAggregateStats() {
  return dbService.getAggregateStats();
}

// Get user rankings
export async function getUserRankings(limit: number = 10) {
  return dbService.getUserRankings(limit);
}

// Get school rankings
export async function getSchoolRankings(limit: number = 10) {
  return dbService.getSchoolRankings(limit);
}
