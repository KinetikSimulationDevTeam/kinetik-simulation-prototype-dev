: <<'END_COMMENT'
How to Use the Script:

Save the script to a file, for example backup_github_to_s3.sh.
Give it execute permissions with the command chmod +x backup_github_to_s3.sh.
Run the script with ./backup_github_to_s3.sh.
END_COMMENT

#!/bin/bash

# Variables
GITHUB_REPO_URL="https://github.com/TaoHuang0/kinetik-simulation.git"
S3_BUCKET="s3://kinetik-simulation-backup"
LOCAL_BACKUP_PATH="/tmp/github-repo-backup" # Temporary local path for the backup
CURRENT_DATE=$(date +%Y-%m-%d)
ARCHIVE_NAME="kinetik-simulation-backup-$CURRENT_DATE.tar.gz"

# Step 1: Clone the GitHub repository
git clone --mirror $GITHUB_REPO_URL $LOCAL_BACKUP_PATH

# Step 2: Archive the cloned repository
tar -czvf $ARCHIVE_NAME -C $LOCAL_BACKUP_PATH .

# Step 3: Upload the archive to the S3 bucket
aws s3 cp $ARCHIVE_NAME $S3_BUCKET/$ARCHIVE_NAME

# Step 4: Remove the local backup and archive files
rm -rf $LOCAL_BACKUP_PATH
rm $ARCHIVE_NAME

echo "Backup complete."
