import {action, makeObservable, observable} from "mobx";

interface CommonError extends Error {
  message: string;
  errors?: FieldError[];
}
interface FieldError {
  fieldName: string;
  message: string;
}

export default class CommonsStore {

  @observable error?: CommonError;
  @observable success?: string;
  @observable sideMenuDrawerExpanded: boolean;
  @observable guiVersion?: string;

  public constructor() {
    makeObservable(this);
    this.sideMenuDrawerExpanded = false;
  }

  @action
  public toggleSideMenuDrawerExpanded() {
    this.sideMenuDrawerExpanded = !this.sideMenuDrawerExpanded;
  }

  @action
  public newError(error: CommonError) {
    this.closeSnacks();
    this.error = error;
  }

  @action
  public newSuccess(success: string) {
    this.closeSnacks();
    this.success = success;
  }

  @action
  public closeSnacks() {
    if (this.success !== undefined) {
      this.success = undefined;
    }
    if (this.error !== undefined) {
      this.error = undefined;
    }
  }
}