from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import  current_user
from app.controllers.admin_controller import dashboard_controller,pdf_templates
from app.controllers.auth_controller import login_user_controller,logout_user_controller,register_user_controller
from app.utils.web_utils import web_guard

main = Blueprint('main', __name__)
admin = Blueprint('admin', __name__, url_prefix='/admin')

# AUTHENTICATION
@main.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated and request.endpoint != 'admin.dashboard':
        return redirect(url_for('admin.dashboard'))
    return login_user_controller(request)

@main.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated and request.endpoint != 'admin.dashboard':
        return redirect(url_for('admin.dashboard'))
    return register_user_controller(request)

@main.route('/', methods=['GET', 'POST'])
def home():
    if current_user.is_authenticated and request.endpoint != 'admin.dashboard':
        return redirect(url_for('admin.dashboard'))
    return login_user_controller(request)

@main.route('/logout')
def logout():
    return logout_user_controller()


# ADMINISTRATOR
@admin.route('/dashboard', methods=['GET', 'POST', 'PUT', 'DELETE'])
@web_guard
def dashboard():
    return dashboard_controller()


@admin.route('/teacher')
@web_guard
def teacher():
    return render_template('admin/teacher.html')


@admin.route('/year')
@web_guard
def year():
    return render_template('admin/year.html')


@admin.route('/pdf_template')
@web_guard
def pdf_template():
    page = request.args.get('page', 'front')  # Default to 'front'
    if page == 'front':
        return render_template('file_layout/front_template.html')
    else:
        return render_template('file_layout/back_template.html')
