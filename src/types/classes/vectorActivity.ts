import Activity, { ActivityPlain } from "./activity";

class VectorActivity {
  public constructor(private activities: Array<Activity> = []) {}

  public printActivities(): void {
    console.log(this.activities);
  }

  public at(index: number): Activity {
    return this.activities[index];
  }

  public toPlainArray(): Array<Activity> {
    return [...this.activities];
  }

  public toPlainArrayWithPlainActivities(): Array<ActivityPlain> {
    const plainArray = new Array<ActivityPlain>();
    this.activities.forEach((activity: Activity) => {
      plainArray.push(activity.toActivityPlain());
    });
    return plainArray;
  }

  public static fromArrayPlainActivityToVectorActivity(
    activities: Array<ActivityPlain>
  ): VectorActivity {
    const copyToConvert = new Array<Activity>();
    activities.forEach((activity: ActivityPlain) => {
      copyToConvert.push(Activity.fromActivityPlainToActivity(activity));
    });
    return new VectorActivity(copyToConvert);
  }

  public addActivity = (activity: Activity): void => {
    this.activities.push(activity);
  };

  public deleteActivity = (id: number): void => {
    const positionActivityToDelete: number = this.getPositionActivity(id);
    this.activities.splice(positionActivityToDelete, 1);
  };

  public updateActivity = (
    id: number,
    name: string,
    description: string,
    status: boolean
  ): void => {
    const positionActivityToUpdate: number = this.getPositionActivity(id);
    this.updateActivityItem(
      positionActivityToUpdate,
      name,
      description,
      status
    );
  };

  public doesActivityExist = (id: number): boolean => {
    for (let i: number = 0; i !== this.activities.length; ++i) {
      if (this.activities[i].Id === id) {
        return true;
      }
    }
    return false;
  };

  private updateActivityItem = (
    position: number,
    name: string,
    description: string,
    status: boolean
  ): void => {
    this.activities[position].Name = name;
    this.activities[position].Description = description;
    this.activities[position].Status = status;
  };

  private getPositionActivity = (id: number): number => {
    let index: number = 0;
    while (this.activities[index].Id !== id) {
      ++index;
    }
    return index;
  };
}

export default VectorActivity;
