import subprocess

# Set the path to the MySQL executable (mysql.exe).
MYSQL_PATH = "C:/Program Files/MySQL/MySQL Server 8.0/bin"  # Use forward slashes on Windows

HOST_NAME = input("Enter the host name or ip: ")

# Prompt the user for the custom database name.
DB_NAME = input("Enter the custom database name: ")

# Set the path to the MySQL dump file.
DUMP_FILE = "F:/Projects/Ongoing_Projects/Legendbit_POS_cloud/backup_db_mysql/lbpos_light_dump.sql"

# Construct the command to create the database.
create_db_command = [
    f"{MYSQL_PATH}/mysqladmin",
    "-h",HOST_NAME,
    "-u", "root",
    "-p",
    "create",
    DB_NAME,
]

# Construct the command to restore the database.
restore_command = [
    f"{MYSQL_PATH}/mysql",
     "-h",HOST_NAME,
    "-u", "root",
    "-p",
    DB_NAME,
    "<",
    DUMP_FILE,
]

# Create the database.
try:
    subprocess.run(create_db_command, shell=True, check=True)
    print(f"Database {DB_NAME} has been created.")

    # Restore the database.
    subprocess.run(restore_command, shell=True, check=True)
    print(f"Database {DB_NAME} has been restored from {DUMP_FILE}.")
except subprocess.CalledProcessError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"An error occurred: {str(e)}")
