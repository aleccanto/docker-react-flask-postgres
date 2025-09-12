from flask import Flask
import os
import psycopg2

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host="db",
        database="postgres",
        user="postgres",
        password="password"
    )
    return conn

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/db')
def db_test():
    try:
        conn = get_db_connection()
        conn.close()
        return "Database connection successful!"
    except Exception as e:
        return f"Database connection failed: {e}"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
