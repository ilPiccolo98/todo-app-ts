import IClonable from "../../interfaces/iClonable";

export type ActivityPlain = {
  id: number;
  name: string;
  description: string;
  status: boolean;
};

class Activity implements IClonable<Activity> {
  public constructor(
    private name: string,
    private description: string,
    private status: boolean
  ) {
    this.id = Activity.counterId;
    ++Activity.counterId;
  }

  public static resetIdGenerator(): void {
    Activity.counterId = 1;
  }

  public get Id() {
    return this.id;
  }

  public get Name() {
    return this.name;
  }

  public set Name(name: string) {
    this.name = name;
  }

  public get Description() {
    return this.description;
  }

  public set Description(description: string) {
    this.description = description;
  }

  public get Status() {
    return this.status;
  }

  public set Status(status: boolean) {
    this.status = status;
  }

  public clone(): Activity {
    const copy = new Activity(this.name, this.description, this.status);
    copy.id = this.id;
    --Activity.counterId;
    return copy;
  }

  public toActivityPlain(): ActivityPlain {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
    };
  }

  public static fromActivityPlainToActivity(activity: ActivityPlain): Activity {
    const convertedActivity = new Activity(
      activity.name,
      activity.description,
      activity.status
    );
    convertedActivity.id = activity.id;
    --Activity.counterId;
    return convertedActivity;
  }

  private id: number;
  private static counterId = 1;
}

export default Activity;
