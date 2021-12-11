from kivy.app import App
from kivy.properties import ObjectProperty, StringProperty
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.screenmanager import Screen, ScreenManager
from kivy.uix.textinput import TextInput
from kivy.uix.widget import Widget


class Menu(BoxLayout):
    pass


class HomeScreen(Screen):

    def __init__(self, **kwargs):
        super(HomeScreen, self).__init__(**kwargs)
        self.box = BoxLayout()
        self.box.orientation = "vertical"
        self.box.add_widget(LoginForm())


class ProfileScreen(Screen):
    pass


class LoginForm(Widget):

    def __init__(self, **kwargs):
        super(LoginForm, self).__init__(**kwargs)
        self.cols = 2
        self.add_widget(Label(text='Email'))
        self.email = TextInput(multiline=False)
        self.add_widget(self.email)
        self.add_widget(Label(text='Password'))
        self.password = TextInput(password=True, multiline=False)
        self.add_widget(self.password)


class ScreenManagement(ScreenManager):
    pass


class UserEntryApp(App):

    def build(self):
        return HomeScreen()


if __name__ == '__main__':
    UserEntryApp().run()
