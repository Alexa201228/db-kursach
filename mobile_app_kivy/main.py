import requests
import json

from kivy.app import App
from kivy.clock import Clock
from kivy.properties import ObjectProperty, StringProperty
from kivy.storage.jsonstore import JsonStore
from kivy.uix.boxlayout import BoxLayout
from kivy.lang import Builder
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.screenmanager import Screen, ScreenManager
from kivy.uix.widget import Widget


data_store = JsonStore('user_data_store.json')


class Menu(BoxLayout):
    pass


class HomeScreen(Screen):
    def __init__(self, **kwargs):
        super(HomeScreen, self).__init__(**kwargs)
        self.load_main_page()
        Clock.schedule_interval(self.load_main_page, 300)

    def load_main_page(self, *args):
        headers = {'Content-type': 'application/json'}
        subscription = requests.get('http://127.0.0.1:8000/api/subscription/detail', headers=headers)
        subscription_list = json.loads(subscription.content)
        self.list_container = BoxLayout()
        self.list_container.orientation = 'vertical'
        self.list_container.size_hint = 1, None
        self.list_container.pos_hint = {'y': 0.8}
        for service in subscription_list:
            inner_box = BoxLayout()
            inner_box.orientation = 'horizontal'
            inner_box.add_widget(Label(text=service['name']))
            inner_box.add_widget(Button(text='Детали'))
            inner_box.size_hint_max_y = 40
            self.list_container.add_widget(inner_box)
        self.add_widget(self.list_container)



class ProfileScreen(Screen):
    def __init__(self, **kwargs):
        super(ProfileScreen, self).__init__(**kwargs)
        self.box = BoxLayout()
        self.box.add_widget(Label(text='This is profile page'))
        self.add_widget(self.box)


class LoginForm(Widget):
    email = ObjectProperty(None)
    password = ObjectProperty(None)

    def login_user(self):
        user_email = str(self.ids.email.text)
        user_password = str(self.ids.password.text)
        request_body = json.dumps({'email': user_email, 'password': user_password})
        headers = {'Content-type': 'application/json'}
        response = requests.post('http://127.0.0.1:8000/api/login/', data=request_body, headers=headers)
        if response.status_code == 200:
            response_content = json.loads(response.content)
            data_store.put('user', refresh_token=response_content['refresh'])
            self.ids.email.text = ''
            self.ids.password.text = ''
            self.parent.parent.parent.current = 'screen_profile'



class RegisterForm(Widget):
    email = ObjectProperty(None)
    password = ObjectProperty(None)
    register_label = StringProperty('')

    def register_user(self):
        user_email = str(self.ids.email.text)
        user_password = str(self.ids.password.text)
        request_body = json.dumps({'email': user_email, 'password': user_password})
        headers = {'Content-type': 'application/json'}
        response = requests.post('http://127.0.0.1:8000/api/register/',
                                 data=request_body, headers=headers)
        if response.status_code == 201:
            response_content = json.loads(response.content)
            print(response_content)
            data_store.put('user', access_token=response_content['access_token'])
            data_store.put('user', refresh_token=response_content['refresh_token'])
            self.register_label = "Регистрация прошла успешно!"
        else:
            self.register_label = "Что-то пошло не так, повторите попытку"
        self.ids.email.text = ''
        self.ids.password.text = ''


class RegisterScreen(Screen):
    def __init__(self, **kwargs):
        super(RegisterScreen, self).__init__(**kwargs)
        self.box = BoxLayout()
        self.box.orientation = "vertical"
        self.registerForm = RegisterForm()
        self.box.add_widget(self.registerForm)
        self.add_widget(self.box)


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
