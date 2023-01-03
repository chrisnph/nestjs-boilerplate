import { Injectable } from '@nestjs/common';
import * as Bull from 'bull';

@Injectable()
export class QueuesManagerService {
  async generateQueue(name: string, data): Promise<any> {
    const queue: Bull.Queue = new Bull(name);
    await queue.add(name, data);
    return {
      status: 200,
      message: `Queue with name ${name} generated successfully!`,
    };
  }

  async getAllJobsFromQueue(name: string, data): Promise<any> {
    const jobStatuses: Bull.JobStatus[] = [
      'waiting',
      'delayed',
      'active',
      'completed',
      'failed',
    ];

    const queue: Bull.Queue = new Bull(name);
    const jobs: Bull.Job[] = await queue.getJobs(jobStatuses);

    return {
      status: 200,
      data: jobs,
    };
  }
}
