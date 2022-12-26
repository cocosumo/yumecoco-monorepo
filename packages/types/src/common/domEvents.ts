export interface ButtonSubmitEvent<T = string> {
  nativeEvent: {
    submitter: {
      name: T
    }
  }
}