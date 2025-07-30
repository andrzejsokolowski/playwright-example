// resource-pool.ts
import fs from 'fs';
import path from 'path';

type idTypesT = 'client';

type ResourceT = {
  id: string;
  type: idTypesT;
};

const RESOURCE_POOL_FILE = path.join(__dirname, 'resource-pool.json');

export class ResourcePool {
  private static instance: ResourcePool;
  private resources: ResourceT[];

  private constructor() {
    this.resources = this.loadResources();
  }

  public static getInstance(): ResourcePool {
    if (!ResourcePool.instance) {
      ResourcePool.instance = new ResourcePool();
    }
    return ResourcePool.instance;
  }

  private loadResources(): ResourceT[] {
    if (fs.existsSync(RESOURCE_POOL_FILE)) {
      const data = fs.readFileSync(RESOURCE_POOL_FILE, 'utf-8');
      return JSON.parse(data) as ResourceT[];
    }
    return [];
  }

  private saveResources(): void {
    fs.writeFileSync(RESOURCE_POOL_FILE, JSON.stringify(this.resources), 'utf-8');
  }

  public addResource(id: string, type: idTypesT): void {
    this.resources.push({ id, type });
    this.saveResources();
  }

  public getResources(): ResourceT[] {
    return this.resources;
  }

  public clearPool(): void {
    this.resources = [];
    this.saveResources();
  }
}
