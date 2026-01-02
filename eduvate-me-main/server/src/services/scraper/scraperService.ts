import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedCutoffData {
  collegeId: string;
  collegeName: string;
  examType: string;
  year: number;
  category: string;
  rank: number;
}

export class ScraperService {
  private static instance: ScraperService;
  
  private constructor() {}
  
  public static getInstance(): ScraperService {
    if (!ScraperService.instance) {
      ScraperService.instance = new ScraperService();
    }
    return ScraperService.instance;
  }
  
  async scrapePage(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
      throw new Error(`Failed to scrape URL: ${url}`);
    }
  }
  
  parseHTML(html: string): cheerio.CheerioAPI {
    return cheerio.load(html);
  }
}