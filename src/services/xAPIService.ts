
import { v4 as uuidv4 } from 'uuid';

// Types for xAPI statements
export interface XAPIStatement {
  id?: string;
  actor: {
    objectType: string;
    name: string;
    mbox?: string;
    account?: {
      homePage: string;
      name: string;
    };
  };
  verb: {
    id: string;
    display: {
      [key: string]: string;
    };
  };
  object: {
    id: string;
    objectType?: string;
    definition?: {
      name?: {
        [key: string]: string;
      };
      description?: {
        [key: string]: string;
      };
      type?: string;
      interactionType?: string;
      correctResponsesPattern?: string[];
      choices?: Array<{
        id: string;
        description: {
          [key: string]: string;
        };
      }>;
    };
  };
  result?: {
    score?: {
      scaled?: number;
      raw?: number;
      min?: number;
      max?: number;
    };
    success?: boolean;
    completion?: boolean;
    response?: string;
    duration?: string;
    extensions?: {
      [key: string]: any;
    };
  };
  context?: {
    registration?: string;
    instructor?: {
      objectType: string;
      name: string;
      mbox?: string;
    };
    team?: {
      objectType: string;
      name: string;
      mbox?: string;
    };
    contextActivities?: {
      parent?: Array<{
        id: string;
        objectType?: string;
      }>;
      grouping?: Array<{
        id: string;
        objectType?: string;
      }>;
      category?: Array<{
        id: string;
        objectType?: string;
      }>;
      other?: Array<{
        id: string;
        objectType?: string;
      }>;
    };
    platform?: string;
    language?: string;
    statement?: {
      objectType: string;
      id: string;
    };
    extensions?: {
      [key: string]: any;
    };
  };
  timestamp?: string;
  stored?: string;
  authority?: {
    objectType: string;
    name: string;
    mbox?: string;
  };
  version?: string;
  attachments?: Array<{
    usageType: string;
    display: {
      [key: string]: string;
    };
    description?: {
      [key: string]: string;
    };
    contentType: string;
    length: number;
    sha2?: string;
    fileUrl?: string;
  }>;
}

// Types for SCORM data
export interface SCORMData {
  cmi: {
    core: {
      student_id: string;
      student_name: string;
      lesson_location: string;
      credit: string;
      lesson_status: string;
      entry: string;
      score: {
        raw: number;
        min: number;
        max: number;
      };
      total_time: string;
      lesson_mode: string;
      exit: string;
      session_time: string;
    };
    suspend_data: string;
    launch_data: string;
    comments: string;
    comments_from_lms: string;
    objectives: {
      id: string;
      score: {
        raw: number;
        min: number;
        max: number;
      };
      status: string;
    }[];
    student_data: {
      mastery_score: number;
      max_time_allowed: string;
      time_limit_action: string;
    };
    student_preference: {
      audio: string;
      language: string;
      speed: number;
      text: string;
    };
    interactions: {
      id: string;
      time: string;
      type: string;
      weighting: string;
      student_response: string;
      result: string;
      latency: string;
    }[];
  };
}

// Analytics data model 
export interface GameAnalytics {
  id: string;
  userId: string;
  userName: string;
  gameId: string;
  gameName: string;
  schoolId?: string;
  schoolName?: string;
  gradeLevel?: string;
  subject?: string;
  startTime: string;
  endTime?: string;
  totalTimeSpent?: string;
  score?: number;
  maxScore?: number;
  percentageScore?: number;
  completed?: boolean;
  progress?: number;
  passed?: boolean;
  interactions?: Array<{
    id: string;
    type: string;
    description?: string;
    studentResponse?: string;
    correctResponse?: string;
    result?: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

class XAPIService {
  private endpoint: string;
  private auth: string;
  
  constructor(endpoint?: string, username?: string, password?: string) {
    // Default to localhost for development, would be replaced with actual LRS endpoint in production
    this.endpoint = endpoint || 'http://localhost:8000/xapi/';
    // Basic auth encoding if credentials provided
    this.auth = username && password 
      ? `Basic ${btoa(`${username}:${password}`)}` 
      : '';
  }

  // Process an xAPI statement
  async processXAPIStatement(statement: XAPIStatement): Promise<GameAnalytics> {
    try {
      // Ensure the statement has an ID
      if (!statement.id) {
        statement.id = uuidv4();
      }
      
      // Set timestamp if not provided
      if (!statement.timestamp) {
        statement.timestamp = new Date().toISOString();
      }
      
      // Send statement to LRS (in a real implementation)
      // await this.sendToLRS(statement);
      
      // Log for debugging
      console.log('Processing xAPI statement:', statement);
      
      // Convert xAPI statement to our analytics model
      const analytics = this.convertXAPIToAnalytics(statement);
      
      // In a real implementation, we would save this to a database
      // await this.saveAnalytics(analytics);
      
      return analytics;
    } catch (error) {
      console.error('Error processing xAPI statement:', error);
      throw error;
    }
  }
  
  // Process SCORM data
  async processSCORMData(data: SCORMData, gameId: string, gameName: string): Promise<GameAnalytics> {
    try {
      // Log for debugging
      console.log('Processing SCORM data:', data);
      
      // Convert SCORM data to our analytics model
      const analytics = this.convertSCORMToAnalytics(data, gameId, gameName);
      
      // In a real implementation, we would save this to a database
      // await this.saveAnalytics(analytics);
      
      return analytics;
    } catch (error) {
      console.error('Error processing SCORM data:', error);
      throw error;
    }
  }

  // Send statement to LRS
  private async sendToLRS(statement: XAPIStatement): Promise<Response> {
    return fetch(`${this.endpoint}statements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.auth,
        'X-Experience-API-Version': '1.0.3'
      },
      body: JSON.stringify(statement)
    });
  }
  
  // Convert xAPI statement to our analytics model
  private convertXAPIToAnalytics(statement: XAPIStatement): GameAnalytics {
    const userId = statement.actor.account?.name || statement.actor.mbox?.replace('mailto:', '') || '';
    const gameId = statement.object.id;
    const gameName = statement.object.definition?.name?.['en-US'] || 'Unknown Game';
    
    // Initialize analytics object
    const analytics: GameAnalytics = {
      id: statement.id || uuidv4(),
      userId,
      userName: statement.actor.name,
      gameId,
      gameName,
      startTime: statement.timestamp || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Extract score if available
    if (statement.result?.score) {
      analytics.score = statement.result.score.raw;
      analytics.maxScore = statement.result.score.max;
      analytics.percentageScore = statement.result.score.scaled ? statement.result.score.scaled * 100 : undefined;
    }
    
    // Extract completion status
    if (statement.result?.completion !== undefined) {
      analytics.completed = statement.result.completion;
    }
    
    // Extract success status
    if (statement.result?.success !== undefined) {
      analytics.passed = statement.result.success;
    }
    
    // Extract context information if available
    if (statement.context?.contextActivities?.grouping) {
      // Typically school, grade, subject information might be encoded in grouping
      const grouping = statement.context.contextActivities.grouping;
      
      // This is a simplified example - in a real implementation,
      // you'd need to define a schema for how this information is encoded
      for (const group of grouping) {
        if (group.id.includes('school')) {
          analytics.schoolId = group.id;
          analytics.schoolName = group.id.split(':').pop();
        } else if (group.id.includes('grade')) {
          analytics.gradeLevel = group.id.split(':').pop();
        } else if (group.id.includes('subject')) {
          analytics.subject = group.id.split(':').pop();
        }
      }
    }
    
    return analytics;
  }
  
  // Convert SCORM data to our analytics model
  private convertSCORMToAnalytics(data: SCORMData, gameId: string, gameName: string): GameAnalytics {
    const core = data.cmi.core;
    
    // Initialize analytics object
    const analytics: GameAnalytics = {
      id: uuidv4(),
      userId: core.student_id,
      userName: core.student_name,
      gameId,
      gameName,
      startTime: new Date().toISOString(), // SCORM doesn't explicitly provide this
      totalTimeSpent: core.total_time,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Extract score
    if (core.score) {
      analytics.score = core.score.raw;
      analytics.maxScore = core.score.max;
      analytics.percentageScore = core.score.raw ? (core.score.raw / core.score.max) * 100 : undefined;
    }
    
    // Extract completion status
    if (core.lesson_status) {
      switch (core.lesson_status) {
        case 'completed':
          analytics.completed = true;
          break;
        case 'incomplete':
          analytics.completed = false;
          break;
        case 'passed':
          analytics.completed = true;
          analytics.passed = true;
          break;
        case 'failed':
          analytics.completed = true;
          analytics.passed = false;
          break;
        default:
          analytics.completed = false;
      }
    }
    
    // Extract interactions
    if (data.cmi.interactions) {
      analytics.interactions = data.cmi.interactions.map(interaction => ({
        id: interaction.id,
        type: interaction.type,
        studentResponse: interaction.student_response,
        result: interaction.result,
        timestamp: interaction.time
      }));
    }
    
    return analytics;
  }
}

export default XAPIService;
