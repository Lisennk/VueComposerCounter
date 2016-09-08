'use strict';

new Vue({
    el: '#app',
    data: {
        totalDownloads: 0,
        downloads: {
            'symfony/symfony': 0,
            'laravel/laravel': 0,
            'yiisoft/yii': 0,
            'codeigniter/framework': 0,
            'cakephp/cakephp': 0,
            'slim/slim': 0
        }
    },
    created: function() {
        var resource = this.$resource('https://packagist.org/packages/{package}.json?nocache={random}');
        setInterval(() => {
            for (let framework in this.downloads) {
                resource.get({package: framework, random: Math.random()}).then((response) => {
                    let downloads = response.body.package.downloads.total;
                    if (this.downloads[framework] != downloads) {
                        if (this.downloads[framework] == 0) this.downloads[framework] = downloads;
                        this.totalDownloads += downloads - this.downloads[framework];
                        console.log(framework, ': +', downloads - this.downloads[framework]);
                        this.downloads[framework] = downloads;
                    }
                });
            }
        }, 500);
    }
});