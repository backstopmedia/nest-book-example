export interface AngularUniversalBundle {
  AppServerModuleNgFactory: any;
  LAZY_MODULE_MAP: any;
}

export interface AngularUniversalOptions {
  viewsPath: string;
  bundle: AngularUniversalBundle;
}
