sqlPwd=`head -1 customConfig.ts`
sqlPwd=${sqlPwd#// }

backupDir="/d/docs/backup/tsdict"
backupExportedDir="$backupDir/exported"
storePath="/d/docs/items/tsdict/server/store"

mkdir -p $backupExportedDir



# 新建要导出数据的文件夹
exportDirName="export-tsdict"
targetBackupDir="$backupExportedDir/$exportDirName"
targetBackupStoreDir="$targetBackupDir/store"
mkdir -p $targetBackupStoreDir

# 打日期标志
touch $targetBackupDir/log.txt
timeStr=$(date "+%Y-%m-%d--%H-%M-%S")
echo "$timeStr" > $targetBackupDir/log.txt

# # 导出数据库
mysqldump -uroot -p$sqlPwd tsdict > $storePath/tsdict.db

# 复制store仓库中的数据库文件至导出目录
cp $storePath/tsdict.db $targetBackupDir

# 导出大文件（图片等）
cp -r $storePath/* $targetBackupStoreDir

# 压缩
cd $targetBackupDir
tar -czvf $backupExportedDir/$exportDirName.tar.gz . 

# 提交store仓库代码
cd $storePath
git add -A
git ci -m "update"
# git push