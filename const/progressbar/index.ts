export enum ProgressbarTheme {
  Default = "default",
  Dashboard = "dashboard",
}

export const ProgressbarThemeLabel = {
  [ProgressbarTheme.Default]: "Стандартный",
  [ProgressbarTheme.Dashboard]: "Дашборд",
} as const;

export enum ProgressbarStatus {
  Success = "success",
  Warning = "warning",
  Error = "error",
}

export const ProgressbarStatusLabel = {
  [ProgressbarStatus.Success]: "Успешно",
  [ProgressbarStatus.Warning]: "Предупреждение",
  [ProgressbarStatus.Error]: "Ошибка",
} as const;

export const ProgressbarStatusColor = {
  [ProgressbarStatus.Success]: "#12ce66",
  [ProgressbarStatus.Warning]: "#e7a23d",
  [ProgressbarStatus.Error]: "#ff4949",
} as const;

export enum ProgressbarSpeed {
  High = "high",
  Medium = "medium",
  Low = "low",
}

export const ProgressbarSpeedLabel = {
  [ProgressbarSpeed.High]: "Высокая",
  [ProgressbarSpeed.Medium]: "Средняя",
  [ProgressbarSpeed.Low]: "Низкая",
} as const;

export const ProgressbarSpeedMs = {
  [ProgressbarSpeed.High]: 50,
  [ProgressbarSpeed.Medium]: 100,
  [ProgressbarSpeed.Low]: 500,
} as const;
