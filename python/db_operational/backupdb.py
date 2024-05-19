import subprocess

# Prompt the user for the database name
#outputDumpFileName = input("Enter the dunmp file name: ")
outputDumpFileName ='lbpos_light_dump'
# Define the mysqldump command as a list of arguments
mysqldump_command = [
    'mysqldump',
    '-u', 'root',
    '-p',
    '--routines',
    '--events',
    '--comments',
    'lbposc_light2'
]

# Specify the path to the output file
output_file_path = f'F:/Projects/Ongoing_Projects/Legendbit_POS_cloud/backup_db_mysql/{outputDumpFileName}.sql'

# Run the mysqldump command
try:
    with open(output_file_path, 'wb') as output_file:
        subprocess.run(mysqldump_command, stdout=output_file, stderr=subprocess.PIPE, text=True, check=True, shell=True)
    print("Backup completed successfully.")
except subprocess.CalledProcessError as e:
    print(f"Error: {e.stderr}")
except Exception as e:
    print(f"An error occurred: {str(e)}")
