// var app = angular.module('myapp', ['ui.router']);
// app.config(function($stateProvider, $urlRouterProvider) {
//   $urlRouterProvider.when("", "/home");
//   $stateProvider
//     .state('home', {
//       url: '/home',
//       templateUrl: 'tpl/home.html',
//       controller: 'HomeController'
//       // controllerAs: 'homeCtrl'
//     })
//     .state('team', {
//       url: '/team',
//       templateUrl: 'tpl/team.html',
//       controller: 'TeamController'
//       // controllerAs: 'ayCtrl'
//     });
// });
var app = angular.module('myapp', []);

// 主页控制
app.controller('HomeController', function($rootScope, $http) {
  $http.get('data/data.json', {
      params: {
        "custId": "12323",
        "data": "strData"
      },
      responseType: "json"
    })
    .then(function(res) {
      $rootScope.data = res.data;
      console.log(res.data);
    }, function() {
      alert('error');
    });
});
// 团队架构
app.controller('TeamController', function($rootScope, $scope, $timeout) {

  $timeout(function () {
    $scope.teamArch = $rootScope.data.teamArch;
  }, 100);

  $timeout(function () {
    $scope.chart1 = echarts.init(document.getElementById('team-chart1'));
    $scope.chart2 = echarts.init(document.getElementById('team-chart2'));
    $scope.chart3 = echarts.init(document.getElementById('team-chart3'));
    $scope.chart4 = echarts.init(document.getElementById('team-chart4'));

    $scope.option = {
      title : {
        text: '',
        x: "center",
        padding: [50, 10]
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [{
        name: '',
        type: 'pie',
        radius: ['20%', '30%'],
        data: [],
        lableLine: {
          normal: {
            show: false,
            length: '4',
            length2: '3'
          }
       }
      }]
    };

    $scope.option.title.text = "男女分布";
    $scope.option.series[0].name = '男女分布';
    $scope.option.series[0].data = [
    {
      value: $scope.teamArch.male,
      name: '男性'
    },
    {
      value: $scope.teamArch.female,
      name: '女性'
    }];
    $scope.chart1.setOption($scope.option);

    $scope.option.title.text = "工龄分布";
    $scope.option.series[0].name = '工龄分布';
    $scope.option.series[0].data = [
    {
      value: $scope.teamArch.senLevel1,
      name: '一年内新人'
    },
    {
      value: $scope.teamArch.senLevel2,
      name: '1-2 年员工'
    },
    {
      value: $scope.teamArch.senLevel3,
      name: '2 年以上员工'
    }];
    $scope.chart2.setOption($scope.option);

    $scope.option.title.text = "xx分布";
    $scope.option.series[0].name = '';
    $scope.option.series[0].data = [
    {
      value: $scope.teamArch.ts,
      name: 'TS'
    },
    {
      value: $scope.teamArch.sa,
      name: 'SA'
    },
    {
      value: $scope.teamArch.ta,
      name: 'TA'
    },
    {
      value: $scope.teamArch.se,
      name: 'SE'
    },
    {
      value: $scope.teamArch.sm,
      name: 'SM'
    },
    {
      value: $scope.teamArch.sd,
      name: 'SD'
    }];
    $scope.chart3.setOption($scope.option);

    $scope.option.title.text = "xx分布";
    $scope.option.series[0].name = '';
    $scope.option.series[0].data = [
    {
      value: $scope.teamArch.zjas,
      name: '直接育成 AS'
    },
    {
      value: $scope.teamArch.zas,
      name: '总育成 AS'
    }];
    $scope.chart4.setOption($scope.option);

    // window.onresize = $scope.chart1.resize;
    // window.onresize = $scope.chart2.resize;
    // window.onresize = $scope.chart3.resize;
    // window.onresize = $scope.chart4.resize;

    console.log($scope.teamArch.zjas);
  }, 1000);


});

// 个人保费
app.controller('PmPersController', function($rootScope, $scope, $timeout) {
  $timeout(function () {
    $scope.pmPers = $rootScope.data.premium.pmPers;
    $scope.month = $rootScope.data.month;
    console.log($scope);
  }, 100);

  $timeout(function () {
    $scope.chart1 = echarts.init(document.getElementById('pm-pers-chart1'));
    $scope.option = {
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
          data: [$scope.month + ' 月保费', '全年累计']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis:  {
          type: 'value'
      },
      yAxis: {
          type: 'category',
          data: ['承保']
      },
      series: [
        {
          name: $scope.month + ' 月保费',
          type: 'bar',
          barWidth : 50,
          stack: '总量',
          label: {
              normal: {
                  show: true,
                  position: 'insideRight'
              }
          },
          data: [$scope.pmPers.amount]
        },
        {
          name: '全年累计',
          type: 'bar',
          barWidth : 50,
          stack: '总量',
          label: {
              normal: {
                  show: true,
                  position: 'insideRight'
              }
          },
          data: [$scope.pmPers.amountAcm]
        }
      ]
    };
    $scope.chart1.setOption($scope.option);
  }, 1000);

});

// 团队保费
app.controller('PmTeamController', function($rootScope, $scope, $timeout) {
  $timeout(function () {
    $scope.pmTeam = $rootScope.data.premium.pmTeam;
    $scope.month = $rootScope.data.month;
    console.log($scope);
  }, 100);

  $timeout(function () {
    $scope.chart1 = echarts.init(document.getElementById('pm-team-chart1'));
    $scope.option = {
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
          data: [$scope.month + ' 月保费', '全年累计']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis:  {
          type: 'value'
      },
      yAxis: {
          type: 'category',
          data: ['承保']
      },
      series: [
        {
          name: $scope.month + ' 月保费',
          type: 'bar',
          barWidth: 50,
          stack: '总量',
          label: {
              normal: {
                  show: true,
                  position: 'insideRight'
              }
          },
          data: [$scope.pmTeam.amount]
        },
        {
          name: '全年累计',
          type: 'bar',
          barWidth: 50,
          stack: '总量',
          label: {
              normal: {
                  show: true,
                  position: 'insideRight'
              }
          },
          data: [$scope.pmTeam.amountAcm]
        }
      ]
    };
    $scope.chart1.setOption($scope.option);
  }, 1000);

});

// 个人最大保单
app.controller('MaxPolicyController', function($rootScope, $scope, $timeout) {
  $timeout(function () {
    $scope.maxPolicy = $rootScope.data.maxPolicy;
    $scope.month = $rootScope.data.month;
    console.log($scope);
  }, 100);

});

// 直辖组销售指标
app.controller('SaleController', function($rootScope, $scope, $timeout) {
  $timeout(function () {
    $scope.sale = $rootScope.data.sale;
    $scope.month = $rootScope.data.month;
    console.log($scope);
  }, 100);

  $timeout(function() {
    $scope.chart1 = echarts.init(document.getElementById('sale-chart1'));
    $scope.option = {
      tooltip: {},
      legend: {
        // data: ['团队销售指标']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '破零人力', max: 70 },
          { name: '破零率', max: 100 },
          { name: '人均产能', max: 70 },
          { name: '3000P人力', max: 70 },
          { name: '万P人力', max: 70 },
          { name: '5万P人力', max: 70 },
          { name: '5万P人力', max: 70 },
          { name: '社区人力', max: 70 },
          { name: '100万人力', max: 70 },
        ]
      },
      series: [{
        name: '团队销售指标',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
        {
          value: [$scope.sale.pl, $scope.sale.plRat, $scope.sale.rjcn, $scope.sale.p3000, $scope.sale.pw, $scope.sale.pw3, $scope.sale.pw5, $scope.sale.community, $scope.sale.million],
          name: '团队销售指标'
        }]
      }]
    };
    $scope.chart1.setOption($scope.option);
  }, 1000);
});

// 直辖组活动量
app.controller('ActiveController', function($rootScope, $scope, $timeout) {
  $timeout(function () {
    $scope.active = $rootScope.data.active;
    $scope.month = $rootScope.data.month;
    $scope.flag = true;
    $scope.flag = $scope.active.c600>=$scope.active.stdC600 && $scope.active.zxz>=$scope.active.stdZxz ? true : false;
    console.log($scope);
  }, 100);

  $timeout(function() {
    $scope.chart1 = echarts.init(document.getElementById('active-chart1'));

    $scope.option = {
     color: ['#3398DB'],
     tooltip: {
       trigger: 'axis',
       axisPointer: { // 坐标轴指示器，坐标轴触发有效
         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
       }
     },
     grid: {
       left: '3%',
       right: '4%',
       bottom: '3%',
       containLabel: true
     },
     xAxis: [{
       type: 'category',
       data: ['c600', 'zxz'],
       axisTick: {
         alignWithLabel: true
       }
     }],
     yAxis: [{
       type: 'value'
     }],
     series: [{
       name: '直辖组活动量',
       type: 'bar',
       barWidth: '60%',
       data: [$scope.active.c600, $scope.active.zxz]
     }]
   };

    $scope.chart1.setOption($scope.option);
  }, 1000);
});

// 直辖组增员
app.controller('RecruitController', function($rootScope, $scope, $timeout) {
  $timeout(function () {
    $scope.recruit = $rootScope.data.recruit;
    $scope.month = $rootScope.data.month;
  }, 100);

  $timeout(function() {
    $scope.chart1 = echarts.init(document.getElementById('recruit-chart1'));

    $scope.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: [$scope.month + '月', '年累计']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['个人新增', '直辖组新增']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: $scope.month + '月',
        type: 'bar',
        data: [$scope.recruit.rcPers, $scope.recruit.rcTeam]
      },
      {
        name: '年累计',
        type: 'bar',
        data: [$scope.recruit.rcPersAcm, $scope.recruit.rcTeamAcm]
      }]
    };


    $scope.chart1.setOption($scope.option);
  }, 1000);
});

// 直辖组出勤
app.controller('PartController', function($rootScope, $scope, $timeout) {
  $timeout(function () {
    $scope.part = $rootScope.data.part;
    $scope.month = $rootScope.data.month;
  }, 100);

  $timeout(function() {
    $scope.chart1 = echarts.init(document.getElementById('part-chart1'));

    $scope.option = {
     color: ['#3398DB'],
     tooltip: {
       trigger: 'axis',
       axisPointer: { // 坐标轴指示器，坐标轴触发有效
         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
       }
     },
     grid: {
       left: '3%',
       right: '4%',
       bottom: '3%',
       containLabel: true
     },
     xAxis: [{
       type: 'category',
       data: ['日均出勤率目标', '日均出勤率'],
       axisTick: {
         alignWithLabel: true
       }
     }],
     yAxis: [{
       type: 'value'
     }],
     series: [{
       name: '团队出勤',
       type: 'bar',
       barWidth: '60%',
       data: [$scope.part.ptTeamGoal, $scope.part.ptTeam]
     }]
   };
    $scope.chart1.setOption($scope.option);
  }, 1000);
});

// 个人收入
app.controller('IncomeController', function($rootScope, $scope, $timeout) {
  $timeout(function () {
    $scope.income = $rootScope.data.income;
    $scope.month = $rootScope.data.month;
  }, 100);

  $timeout(function() {
    $scope.chart1 = echarts.init(document.getElementById('income-chart1'));

    $scope.option = {
       tooltip: {
         trigger: 'item',
         formatter: "{a} <br/>{b} : {c} ({d}%)"
       },
       legend: {
         orient: 'vertical',
         left: 'left',
         data: ['管理津贴', '首佣', '续佣', '其他附加佣金']
       },
       series: [{
         name: '访问来源',
         type: 'pie',
         radius: '55%',
         center: ['50%', '70%'],
         data: [
           { value: $scope.income.gljt, name: '管理津贴' },
           { value: $scope.income.sy, name: '首佣' },
           { value: $scope.income.xy, name: '续佣' },
           { value: $scope.income.other, name: '其他附加佣金' }
         ],
         itemStyle: {
           emphasis: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       }]
    };

    $scope.chart1.setOption($scope.option);
  }, 1000);
});

// 专业术语
//
// 建议专业术语附上英文
/*
保单
====
保单号
投保人
承保时间

个人保费
======
承保件数
个人标保
中支
县支

销售指标
=======
破零人数
破零率
人均产能
3000P人力
万P人力
3万P人力
5万P人力
社区人力
100万人力

直辖组活动量
========
600C 人力

出勤 attendance

个人收入
====
管理津贴
首佣
续佣
其他佣金



 */
