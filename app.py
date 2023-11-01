from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Flask, request, flash, redirect, url_for
import mysql.connector
import bcrypt
import os
import re 

app = Flask(__name__)

# Cargar la configuración desde el archivo config.py
app.config.from_pyfile('config.py')

# Establecer la conexión a la base de datos MySQL
conn = mysql.connector.connect(**app.config['DATABASE_CONFIG'])
cursor = conn.cursor()

# Crear la tabla 'login' si no existe
def crear_tabla_login():
    cursor.execute('''CREATE TABLE IF NOT EXISTS login (
                      ID INT AUTO_INCREMENT PRIMARY KEY,
                      Usuario VARCHAR(50) NOT NULL,
                      Contraseña VARCHAR(60) NOT NULL,
                      CorreoElectronico VARCHAR(50) NOT NULL)''')
    conn.commit()

# Crear la tabla 'juego' si no existe
def crear_tabla_juego():
    cursor.execute('''CREATE TABLE IF NOT EXISTS juego (
                      ID INT AUTO_INCREMENT PRIMARY KEY,
                      JugadorID INT,
                      NombreJugador VARCHAR(50) NOT NULL,
                      NombreJuego VARCHAR(50) NOT NULL,
                      Puntuacion INT)''')
    conn.commit()

@app.route('/')
def index():
    show_login = request.args.get('show_login', False)
    show_signup = request.args.get('show_signup', False)
    return render_template('index.html', show_login=show_login, show_signup=show_signup)

@app.route('/registrar', methods=['POST'])
def registrar():
    if request.method == 'POST':
        usuario = request.form['Usuario']
        contraseña = request.form['pswd']
        correo = request.form['email']

   # Verificar si el usuario ya existe
        cursor = conn.cursor()
        cursor.execute("SELECT Usuario FROM login WHERE Usuario = %s", (usuario,))
        existing_user = cursor.fetchone()
        cursor.close()

        if existing_user:
            flash('El nombre de usuario ya está en uso. Elige otro.')
            return redirect(url_for('index'))
        #Verificar si el correo es de Gmail
        if not re.match(r"[^@]+@gmail\.com", correo):
            flash('Por favor, ingresa una dirección de correo de Gmail válida.')
            return redirect(url_for('index'))
        
        # Cifra la contraseña antes de almacenarla en la base de datos
        hashed_password = bcrypt.hashpw(contraseña.encode('utf-8'), bcrypt.gensalt())

        try:
            # Inserta los datos en la tabla 'login' junto con la contraseña cifrada
            cursor.execute("INSERT INTO login (Usuario, Contraseña, CorreoElectronico) VALUES (%s, %s, %s)", (usuario, hashed_password, correo))
            conn.commit()

            flash("Registro exitoso", "success")  # Muestra un mensaje de éxito

            # Redirige a la página de inicio con la sección de "Crear cuenta" visible
            return redirect(url_for('index', show_signup=True))
        except mysql.connector.Error as err:
            flash("Error al registrar usuario", "error")  # Muestra un mensaje de error
            print(f"Error de MySQL: {err}")

    # En caso de que el método HTTP no sea POST, puedes redirigir al usuario a la página de inicio
    return redirect(url_for('index'))

@app.route('/iniciar_sesion', methods=['POST'])
def iniciar_sesion():
    if request.method == 'POST':
        usuario = request.form['Usuario']
        contraseña = request.form['pswd']

        try:
            # Obtén la contraseña almacenada en la base de datos para el usuario dado
            cursor.execute("SELECT Contraseña FROM login WHERE Usuario = %s", (usuario,))
            result = cursor.fetchone()

            if result:  # Si se encontró el usuario en la base de datos
                stored_password = result[0]

                # Verifica si la contraseña ingresada coincide con la contraseña almacenada
                if bcrypt.checkpw(contraseña.encode('utf-8'), stored_password.encode('utf-8')):
                    session['usuario'] = usuario  # Almacena el nombre de usuario en la sesión
                    return redirect(url_for('dashboard'))  # Redirige a la página de dashboard
                else:
                    flash("Contraseña incorrecta", "error")  # Muestra un mensaje de error
                    # Redirige a la página de inicio con la sección de "Iniciar sesión" visible
                    return redirect(url_for('index', show_login=True))
            else:
                flash("Usuario no encontrado", "error")  # Muestra un mensaje de error
                # Redirige a la página de inicio con la sección de "Iniciar sesión" visible
                return redirect(url_for('index', show_login=True))
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")

    # En caso de que el método HTTP no sea POST, puedes redirigir al usuario a la página de inicio
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    # Verifica si el usuario está autenticado
    if 'usuario' in session:
        return render_template('dashboard.html')

    else:
        flash("Debes iniciar sesión primero", "error")
        return redirect(url_for('index', show_login=True))

@app.route('/regresar', methods=['POST'])
def regresar():
    # Verifica si el usuario está autenticado
    if 'usuario' in session:
        return render_template('dashboard.html')
    else:
        flash("Debes iniciar sesión primero", "error")
        return redirect(url_for('index', show_login=True))
    
@app.route('/gato', methods=['POST'])
def gato():
    if 'usuario' in session:
        return render_template('gato.html')
    else:
        flash("Debes iniciar sesión primero", "error")
        return redirect(url_for('index', show_login=True))

@app.route('/cerrar_sesion', methods=['POST'])
def cerrar_sesion():
    # Elimina el nombre de usuario de la sesión
    session.pop('usuario', None)
    # Redirige a la página de inicio con la sección de "Iniciar sesión" visible
    return redirect(url_for('index'))

if __name__ == '__main__':
    crear_tabla_login()  # Crea la tabla 'login' si no existe
    crear_tabla_juego()  # Crea la tabla 'juego' si no existe
    app.secret_key = os.urandom(24)  # Clave secreta para las sesiones
    app.run(debug=True)
