import IDeepClonable from "../interfaces/iDeeepClonable";

class Activity implements IDeepClonable<Activity> {
  public constructor(
    private name: string,
    private description: string,
    private status: boolean
  ) {
    this.id = Activity.idCounter;
    ++Activity.idCounter;
  }

  public clone = (): Activity => {
    const copy: Activity = new Activity(
      this.name,
      this.description,
      this.status
    );
    copy.id = this.id;
    --Activity.idCounter;
    return copy;
  };

  get Id(): number {
    return this.id;
  }

  get Name(): string {
    return this.name;
  }

  get Description(): string {
    return this.description;
  }

  get Status(): boolean {
    return this.status;
  }

  set Name(name: string) {
    this.name = name;
  }

  set Description(description: string) {
    this.description = description;
  }

  set Status(status: boolean) {
    this.status = status;
  }

  private static idCounter: number = 1;
  private id: number;
}

export default Activity;
