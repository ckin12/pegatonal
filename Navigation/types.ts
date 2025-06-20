export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ForgotPasswordScreens: undefined;
  Home: undefined;
  DetailComic: {
    user: {
      id: string;
      username: string;
    };
    comic: {
      id: string;
      title: string;
      price: number;
      image: string;
    };
  };
};
