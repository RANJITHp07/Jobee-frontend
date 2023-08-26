module.exports = {
  apps : [{
    script:'npm start'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      key:'jobee-instances.pem',
      user : 'ubuntu',
      host : '13.48.148.48',
      ref  : 'origin/main',
      repo : 'https://github.com/RANJITHp07/Jobee-frontend',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
