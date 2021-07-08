rsync --exclude=*.git\
 --exclude=*node_modules\
 --exclude=customConfig.ts\
 --exclude=backup-tsdict.sh\
 -r -e 'ssh -p 2435' . ../../tsdict-client/dist root@s4.s100.vip:deploy-tsdict
