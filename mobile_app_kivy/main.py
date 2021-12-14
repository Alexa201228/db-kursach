import requests
import json

from kivy.app import App
from kivy.clock import Clock
from kivy.properties import ObjectProperty, StringProperty
from kivy.storage.jsonstore import JsonStore
from kivy.uix.boxlayout import BoxLayout
from kivy.lang import Builder
from kivy.uix.recycleview import RecycleView
from kivy.uix.screenmanager import Screen, ScreenManager
from kivy.uix.widget import Widget


data_store = JsonStore('user_data_store.json')


class Menu(BoxLayout):
    pass


class MainRecycleView(RecycleView):

    def __init__(self, **kwargs):
        super(MainRecycleView, self).__init__(**kwargs)
        self.load_user()
        Clock.schedule_interval(self.load_user, 10)

    def load_user(self, *args):
        pass


class HomeScreen(Screen):
    pass


class ProfileScreen(Screen):
    pass


class LoginForm(Widget):
    email = ObjectProperty(None)
    email_input = StringProperty('')
    password = ObjectProperty(None)
    password_input = StringProperty('')

    def login_user(self):
        user_email = str(self.ids.email.text)
        user_password = str(self.ids.password.text)
        request_body = json.dumps({'email': user_email, 'password': user_password})
        headers = {'Content-type': 'application/json'}
        response = requests.post('http://127.0.0.1:8000/api/login/', data=request_body, headers=headers)
        response_content = json.loads(response.content)
        data_store.store_put('access_token', response_content['access'])
        data_store.store_put('refresh_token', response_content['refresh'])
        print(data_store)


class LoginScreen(Screen):
    def __init__(self, **kwargs):
        super(LoginScreen, self).__init__(**kwargs)
        self.box = BoxLayout()
        self.box.orientation = "vertical"
        self.loginForm = LoginForm()
        self.box.add_widget(self.loginForm)
        self.add_widget(self.box)


class ScreenManagement(ScreenManager):
    pass


kivy_builder = Builder.load_file('login.kv')


class UserEntryApp(App):
    def build(self):
        return kivy_builder


if __name__ == '__main__':
    UserEntryApp().run()
