import {action, makeObservable, observable} from "mobx";

export default class CommonsStore {

  @observable error?: string;
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
  public newError(error: string) {
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
      this.success = undefined;
      this.error = undefined;
  }
}