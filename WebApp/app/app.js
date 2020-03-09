'use strict';

var app = angular.module('ChainApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ngSanitize',  'dx']).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]).directive('repeatDirective', function () {
     
    return function (scope, element, attrs) {
        
        if (scope.$last) {
            scope.$emit(attrs.repeatDirective);
             
        }
    };
});
 
app.config(function ($routeProvider) {
    var version = 0.9;
    
    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html?v=" + version,
        title: '3D-Chain',
         
    });

    $routeProvider.when("/about", {
        controller: "aboutController",
        templateUrl: "/app/views/about.html",
        title: '3D-Chain - About',

    });
    $routeProvider.when("/press", {
        controller: "pressController",
        templateUrl: "/app/views/press.html",
        title: '3D-Chain - Press',

    });
    $routeProvider.when("/research", {
        controller: "researchController",
        templateUrl: "/app/views/research.html",
        title: '3D-Chain - Research & Development',

    });
    $routeProvider.when("/researchers", {
        controller: "researchersController",
        templateUrl: "/app/views/researchers.html",
        title: '3D-Chain - Researchers Network',

    });
    $routeProvider.when("/printing", {
        controller: "printingController",
        templateUrl: "/app/views/printing.html",
        title: '3D-Chain - 3D Printing Service',

    });
    $routeProvider.when("/service", {
        controller: "printingController",
        templateUrl: "/app/views/printing.html",
        title: '3D-Chain - 3D Printing Service',

    });
    $routeProvider.when("/printers", {
        controller: "printersController",
        templateUrl: "/app/views/printers.html",
        title: '3D-Chain - 3D Printers',

    });
    $routeProvider.when("/materials", {
        controller: "materialsController",
        templateUrl: "/app/views/materials.html",
        title: '3D-Chain - 3D Printing Material',

    });
    $routeProvider.when("/company/:id", {
        controller: "manprofileController",
        templateUrl: "/app/views/manprofile.html",
        //title: '3D-Chain - 3D Printing Service',
        type: -1,

    });
    $routeProvider.when("/company/:id/:edit", {
        controller: "manprofileController",
        templateUrl: "/app/views/manprofile.html",
        //title: '3D-Chain - 3D Printing Service',
        type: -1,

    });
    $routeProvider.when("/printer/:id", {
        controller: "printerProfileController",
        templateUrl: "/app/views/printerprofile.html",
        //title: '3D-Chain - 3D Printing Service',
        type: -1,

    });
    $routeProvider.when("/material/:id", {
        controller: "materialProfileController",
        templateUrl: "/app/views/materialprofile.html",
        //title: '3D-Chain - 3D Printing Service',
        type: -1,

    });
    $routeProvider.when("/signin", {
        controller: "signInController",
        templateUrl: "/app/views/signin.html",
        title: '3D-Chain - Sign In',
        IsSignInHidden:true,

    });
    $routeProvider.when("/signin/:ref", {
        controller: "signInController",
        templateUrl: "/app/views/signin.html",
        title: '3D-Chain - Sign In',
        IsSignInHidden: true,

    });
    $routeProvider.when("/signup/development", {
        controller: "signUpController",
        templateUrl: "/app/views/signup.html",
        title: '3D-Chain - Sign Up (Development)',
        type: 1,//Research and Development network

    });
    $routeProvider.when("/signup/service", {
        controller: "signUpServiceController",
        templateUrl: "/app/views/signupservice.html",
        title: '3D-Chain - Sign Up (Development)',
        type: 1,//Research and Development network

    });
    $routeProvider.when("/signup/user", {
        controller: "signup2Controller",
        templateUrl: "/app/views/signup2.html",
        title: '3D-Chain - Sign Up (User)',
        type: 1,//Research and Development network

    });
    $routeProvider.when("/profile/:id", {
        controller: "profileController",
        templateUrl: "/app/views/profile.html",
        type: -1,

    });
    $routeProvider.when("/privacy", {
        controller: "privacyController",
        templateUrl: "/app/views/privacy.html",
        type: -1,

    });
    $routeProvider.when("/useragreement", {
        controller: "userAgreementController",
        templateUrl: "/app/views/useragreement.html",
        type: -1,

    });

     
     $routeProvider.otherwise({ redirectTo: "/home" });

});   

 


var serviceBase =  'http://localhost:58909/';
//var webBase = 'http://localhost:23579/';

//var serviceBase = 'http://api.3dchain.epatrin.ir/';
//var webBase = 'http://3dchain.epatrin.ir/';
var webBase = 'http://localhost:23579/';
//http://localhost:23579/content/upload/



    //'http://localhost:58908/';
    //'http://localhost:40654/';
   
    //'http://localhost:10707/';
//'http://ngauthenticationapi.azurewebsites.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});
 
//app.config(function ($httpProvider) {
app.config(['$httpProvider', function ($httpProvider) {
   
   // $httpProvider.interceptors.push('authInterceptorService');
}]);
 
app.run(['$rootScope', '$location', '$window', '$templateCache', 'authService', 'activityService', function ($rootScope, $location, $window, $templateCache, authService, activityService) {
   
    $rootScope.browser_title = '';
    $rootScope.serviceUrl = serviceBase;
    $rootScope.fileHandlerUrl = webBase + 'filehandler.ashx';
    $rootScope.clientsFilesUrl = webBase + '/content/upload/';;
    $rootScope.imagesUrl = webBase + '/content/upload/';
    $rootScope.app_title = '3D-Chain Network';
    $rootScope.page_title = '';
    $rootScope.app_remark = 'Lorem ipsum dolor sit amet';
    $rootScope.module = '';
    $rootScope.moduleId = -1;
    $rootScope.moduleRemark = '';
    $rootScope.theme = '';
    $rootScope.color = '';
    $rootScope.class = '';
    $rootScope.userName = '';
    $rootScope.userTitle = '';
    $rootScope.userId = null;
    $rootScope.image = '';
    DevExpress.ui.themes.current('material.purple-light');
    authService.fillAuthData();
    $rootScope.logOut = function () { authService.logOut(); };
     
    $rootScope.viewProfile = function () {
        if ($rootScope.role=='Person')
            $rootScope.navigate2('/profile/' + $rootScope.userId);
        else
            $rootScope.navigate2('/company/' + $rootScope.userId);
    };
   // alert($rootScope.userName);
   // alert($rootScope.userTitle);
    ////////////////////
    $rootScope.subscribe_name = null;
    $rootScope.subscribe_email = null;
    $rootScope.subscribe = function () {
        alert($rootScope.subscribe_name);
        alert($rootScope.subscribe_email);
    };
    $rootScope.getWindowSize = function () {
       
        var w = $(window).width();
        var h = $(window).height();


        return { width: w, height: h };
    };
    $rootScope.popupHeightFull = function (a, fullscreen) {
        if (!fullscreen)
            return $jq(window).height() *a ;
        else
            return $jq(window).height();
    };
    $rootScope.popupHeightFullMax = function (a, max) {
        var h = $jq(window).height() * a;
        if (h > max)
            return max;
        else
            return h;
         
    };
    $rootScope.popupHeight = function (h, mobileFull) {
        if (mobileFull) {
            return h;
        }
         
            return h;
    };
    $rootScope.popupHeight2 = function (a) {
        var h = $jq(window).height() * a;

        return h;
    };
    $rootScope.popupWidth = function (w, fullscreen) {
        var window_width = ($jq(window).width());
        var window_height = ($jq(window).height());
        if (!fullscreen) {
            //if (window_width < 400)
            //    return window_width;
            //else
                return w;
        }
        else
            return w;//$jq(window).width();
    };
     //////////////////////////
    $rootScope.getDatasourceOption = function (pid) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'api/options/' + pid,
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['OrderIndex', 'Title'],
        });
    };
    $rootScope.getDatasourceCountries = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'api/countries/',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Name'],
        });
    };
    $rootScope.getDatasourceMans = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'api/manufacturers',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Name'],
        });
    };
    $rootScope.getDatasourceJobs = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'api/jobs/',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['AssignedRole1'],
        });
    };
    /////////////////////////
    $rootScope.getSelectedRow = function (instance) {
        if (!instance)
            return null;
        var rows = instance.getSelectedRowsData();
        if (rows && rows.length > 0)
            return rows[0];
        return null;
    };
    $rootScope.getSelectedRows = function (instance) {
        if (!instance)
            return null;
        var rows = instance.getSelectedRowsData();
        if (rows && rows.length > 0)
            return rows;
        return null;
    };
    /////////////////////////
    $rootScope.researchers = [
        {
            "Id": 4,
            Email: 'babak@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Additive Manufacturing, 3D Concrete Printing, Design of Experiments',
            DateJoin: 'January 2019',
            "Name": "Babak Zareiyan",
            "LastName": "Zareiyan",
            "Prefix": "Mr.",
            "Position": "Co-founder",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "Babak.jpg",
            "BirthDate": "1964/03/16",
            "HireDate": "1995/01/15",
            "Notes": "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
            "Address": "351 S Hill St.",
            "Education": "PhD, Civil Engineering",
            Networks: [
                { Id: 7, Title: '3DP Technology', link: '#' },
                { Id: 1, Title: '3DP (Concrete)', link: '#' },
                { Id: 9, Title: 'Material Engineering', link: '#' },
                { Id: 3, Title: 'Business Development', link: '#' },
            ],
            Activity: [{ title: 'Babak wrote a review for 3D-Chain', rate: 5, date: '1/20/2019' }],
            Publications: [
                {Id:1, Title: 'Effects of mixture ingredients on extrudability of concrete in Contour Crafting', Remark: '2018 - Rapid Prototyping Journal' },
                { Id: 2, Title: 'Effects of mixture ingredients on interlayer adhesion of concrete in Contour Crafting', Remark: '2018 - Rapid Prototyping Journal' },
                { Id: 3,Title: 'Effects of interlocking on interlayer adhesion and strength of structures in 3D printing of concrete', Remark: '2017 - Automation in Construction' },
                { Id: 4,Title: 'Interlayer adhesion and strength of structures in Contour Crafting-Effects of aggregate size, extrusion rate, and layer thickness', Remark: '2017 - Automation in Construction' },
            ],
            Awards: [
                { Title: 'Featured Research Assistant', Date: 'Aug 2015', Issuer: 'Sonny Astani Department of Civil and Environmental Engineering' },
                { Title: 'Best Student Paper', Date: 'Apr 2015 ', Issuer: 'Institute of Industrial Engineers, Construction Division' },
            ],
            Projects: [
                { Title:'Lorem ipsum dolor sit amet',Date:'Apr 2015'}
            ],
            Patents: [
                { Title: 'Lorem ipsum dolor sit amet (1)', Date: 'Aug 2017', Issuer: 'Patent issuer' },
                { Title: 'Lorem ipsum dolor sit amet (2)', Date: 'Feb 2016', Issuer: 'Patent issuer' },
                { Title: 'Lorem ipsum dolor sit amet (3)', Date: 'Aug 2015', Issuer: 'Patent issuer' },
            ],
            Certifications: [
                { Title: 'Lorem ipsum dolor sit amet (1)', Authority: 'Certification Authority' },
                
            ],
            Summary: { Reviews: 12, },
        },
        {
            "Id": 101,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/korjani/',
            Remark:'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "Mehdi Korjani",
            "LastName": "Korjani",
            "Prefix": "Mr.",
            "Position": "Co-founder",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "mohammad.jpg",
            "BirthDate": "1964/03/16",
            "HireDate": "1995/01/15",
            "Notes": "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
            "Address": "351 S Hill St.",
            "Education": "PhD, Electrical Engineering",
            Networks: [
                { Id: 4, Title: 'Artificial Intelligence', link: '#' },
                { Id: 2, Title: 'Internet of Things', link: '#' },
                { Id: 3, Title: 'Business Development', link: '#' },
            ],
            Activity: [{ title: 'Mehdi wrote a review for 3D-Chain', rate: 4.5, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        },
        {
            "Id": 1,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "John Heart",
            "LastName": "Heart",
            "Prefix": "Mr.",
            "Position": "CEO",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "01.png",
            "BirthDate": "1964/03/16",
            "HireDate": "1995/01/15",
            "Notes": "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
            "Address": "351 S Hill St.",
            "Education": "MSc, Electrical Engineering",
            Networks: [

                { Id: 4, Title: 'Artificial Intelligence', link: '#' },

            ],
            Activity: [{ title: 'John wrote a review for 3D-Chain', rate: 4, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        }, {
            "Id": 20,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "Olivia Peyton",
            "LastName": "Peyton",
            "Prefix": "Mrs.",
            "Position": "Sales Assistant",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "09.png",
            "BirthDate": "1981/06/03",
            "HireDate": "2012/05/14",
            "Notes": "Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.",
            "Address": "807 W Paseo Del Mar",
            "Education": "BSc, Civil Engineering",
            Networks: [

                { Id: 2, Title: 'Internet of Things', link: '#' },

            ],
            Activity: [{ title: 'User wrote a review for 3D-Chain', rate: 3, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        }, {
            "Id": 400,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "Robert Reagan",
            "LastName": "Reagan",
            "Prefix": "Mr.",
            "Position": "CMO",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "03.png",
            "BirthDate": "1974/09/07",
            "HireDate": "2002/11/08",
            "Notes": "Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.",
            "Address": "4 Westmoreland Pl.",
            "Education": "MSc, Electrical Engineering",
            Networks: [
                { Id: 1, Title: '3DP (Concrete)', link: '#' },

            ],
            Activity: [{ title: 'User wrote a review for 3D-Chain', rate: 3, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        }, {
            "Id": 5,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "Greta Sims",
            "LastName": "Sims",
            "Prefix": "Ms.",
            "Position": "HR Manager",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "04.png",
            "BirthDate": "1977/11/22",
            "HireDate": "1998/04/23",
            "Notes": "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.",
            "Address": "1700 S Grandview Dr.",
            "Education": "PhD, Civil Engineering",
            Networks: [
                { Id: 1, Title: '3DP (Concrete)', link: '#' },
                { Id: 4, Title: 'Artificial Intelligence', link: '#' },
                { Id: 2, Title: 'Internet of Things', link: '#' },
                { Id: 3, Title: 'Business Development', link: '#' },
            ],
            Activity: [{ title: 'User wrote a review for 3D-Chain', rate: 3, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        }, {
            "Id": 6,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "Brett Wade",
            "LastName": "Wade",
            "Prefix": "Mr.",
            "Position": "IT Manager",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "05.png",
            "BirthDate": "1968/12/01",
            "HireDate": "2009/03/06",
            "Notes": "Brett came to DevAv from Microsoft and has led our IT department since 2012.\r\n\r\nWhen he is not working hard for DevAV, he coaches Little League (he was a high school pitcher).",
            "Address": "1120 Old Mill Rd.",
            "Education": "BSc, Electrical Engineering",
            Networks: [
                { Id: 1, Title: '3DP (Concrete)', link: '#' },

                { Id: 2, Title: 'Internet of Things', link: '#' },

            ],
            Activity: [{ title: 'User wrote a review for 3D-Chain', rate: 3, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        }, {
            "Id": 7,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "Sandra Johnson",
            "LastName": "Johnson",
            "Prefix": "Mrs.",
            "Position": "Controller",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "06.png",
            "BirthDate": "1974/11/15",
            "HireDate": "2005/05/11",
            "Notes": "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
            "Address": "4600 N Virginia Rd.",
            "Education": "PhD, Civil Engineering",
            Networks: [
                { Id: 1, Title: '3DP (Concrete)', link: '#' },

            ],
            Activity: [{ title: 'User wrote a review for 3D-Chain', rate: 3, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        }, {
            "Id": 10,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "Kevin Carter",
            "LastName": "Carter",
            "Prefix": "Mr.",
            "Position": "Shipping Manager",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "07.png",
            "BirthDate": "1978/01/09",
            "HireDate": "2009/08/11",
            "Notes": "Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.\r\n\r\nWhen not in the office, he is usually on the basketball court playing pick-up games.",
            "Address": "424 N Main St.",
            "Education": "MSc, Electrical Engineering",
            Networks: [
                { Id: 1, Title: '3DP (Concrete)', link: '#' },

                { Id: 3, Title: 'Business Development', link: '#' },
            ],
            Activity: [{ title: 'User wrote a review for 3D-Chain', rate: 3, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        }, {
            "Id": 11,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "Cynthia Stanwick",
            "LastName": "Stanwick",
            "Prefix": "Ms.",
            "Position": "HR Assistant",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "Picture": "08.png",
            "BirthDate": "1985/06/05",
            "HireDate": "2008/03/24",
            "Notes": "Cindy joined us in 2008 and has been in the HR department for 2 years. \r\n\r\nShe was recently awarded employee of the month. Way to go Cindy!",
            "Address": "2211 Bonita Dr.",
            "Education": "MSc, Electrical Engineering",
            Networks: [

                { Id: 3, Title: 'Business Development', link: '#' },
            ],
            Activity: [{ title: 'User wrote a review for 3D-Chain', rate: 3, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        }, {
            "Id": 30,
            Email: 'mail@3dchain.io',
            Website: 'www.3dchain.io',
            Twitter: '3dChain',
            LinkedIn: 'https://www.linkedin.com/in/babak-zareiyan-phd-a8206459/',
            Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            DateJoin: 'February 2019',
            "Name": "Kent Samuelson",
            "LastName": "Samuelson",
            "Prefix": "Dr.",
            "Position": "Ombudsman",
            "Picture": "02.png",
            "Location": "Los Angeles, CA, United States",
            "Organization": "3d-Chain",
            "BirthDate": "1972/09/11",
            "HireDate": "2009/04/22",
            "Notes": "As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field.    He is a classically trained musician and is a member of the Chamber Orchestra.",
            "Address": "12100 Mora Dr",
            "Education": "MSc, Civil Engineering",
            Networks: [

                { Id: 4, Title: 'Artificial Intelligence', link: '#' },
                { Id: 2, Title: 'Internet of Things', link: '#' },

            ],
            Activity: [{ title: 'User wrote a review for 3D-Chain', rate: 3, date: '1/20/2019' }],
            Summary: { Reviews: 8, },
        }];
    ///////////////////
    $rootScope.history = [];
    $rootScope.$on('$routeChangeSuccess', function (event, currentRoute, previousRoute ) {
        $rootScope.history.push($location.$$path);
       // if (currentRoute.$$route.IsSignInHidden)
       //     $rootScope.IsSignInVisible = false;
        $rootScope.browser_title = currentRoute.$$route.title;
        

    });
    ///////////////////////////////
    $rootScope.navigate = function (target, key, module) {
       
        //var rec = Enumerable.From(Config.MenuItems).Where('$.key=="' + key + '"').FirstOrDefault();
        //activityService.hitMenu(key, target, 'Visiting ' + $rootScope.module + ' > ' + rec.title, module);

     //   $window.location.assign('#!'+target);
        $rootScope.$apply(function () {
            $location.path(target);
        });

    };
    $rootScope.navigate2 = function (target, key, module) {

        //var rec = Enumerable.From(Config.MenuItems).Where('$.key=="' + key + '"').FirstOrDefault();
        //activityService.hitMenu(key, target, 'Visiting ' + $rootScope.module + ' > ' + rec.title, module);

        //   $window.location.assign('#!'+target);
       
            $location.path(target);
        

    };
    ///////////////////////////////
    var $jq = jQuery.noConflict();
    $rootScope.header_menu_mouse = function () {
        var left = $jq('#header_menu').css('left');
        var y = $jq(window).scrollTop();
        var t = Number(y) + 42;
       // alert(left);
        $jq('#header_menu_content') .css('opacity', '1').css('height', 'auto').css('top',t+'px');
    };
    $rootScope.header_menu_leave = function () {

        $jq('#header_menu_content').css('opacity', '0').css('height', '0');
    };
   
    /////////////////////////////////////////////////////
   
    var rtl = $jq('body').hasClass('rtl');
    //////////////////////////////////////////////////////
    function retinaLogo() {
        if (window.devicePixelRatio > 1) {

            var el = '';
            var src = '';
            var height = '';

            var parent = $jq('#Top_bar #logo');
            var parentH = parent.data('height');

            var maxH = {
                sticky: {
                    init: 35,
                    no_padding: 60,
                    overflow: 110
                },
                mobile: {
                    mini: 50,
                    mini_no_padding: 60
                },
                mobile_sticky: {
                    init: 50,
                    no_padding: 60,
                    overflow: 80
                }
            };

            $jq('#Top_bar #logo img').each(function (index) {

                el = $jq(this);
                src = el.data('retina');
                height = el.height();


                // main -----

                if (el.hasClass('logo-main')) {

                    if ($jq('body').hasClass('logo-overflow')) {

                        // do nothing

                    } else if (height > parentH) {

                        height = parentH;

                    }

                }

                // sticky -----

                if (el.hasClass('logo-sticky')) {

                    if ($jq('body').hasClass('logo-overflow')) {

                        if (height > maxH.sticky.overflow) {
                            height = maxH.sticky.overflow;
                        }

                    } else if ($jq('body').hasClass('logo-no-sticky-padding')) {

                        if (height > maxH.sticky.no_padding) {
                            height = maxH.sticky.no_padding;
                        }

                    } else if (height > maxH.sticky.init) {

                        height = maxH.sticky.init;

                    }

                }

                // mobile -----

                if (el.hasClass('logo-mobile')) {

                    if ($jq('body').hasClass('mobile-header-mini')) {

                        if (parent.data('padding') > 0) {

                            if (height > maxH.mobile.mini) {
                                height = maxH.mobile.mini;
                            }

                        } else {

                            if (height > maxH.mobile.mini_no_padding) {
                                height = maxH.mobile.mini_no_padding;
                            }

                        }

                    }

                }

                // mobile-sticky -----

                if (el.hasClass('logo-mobile-sticky')) {

                    if ($jq('body').hasClass('logo-no-sticky-padding')) {

                        if (height > maxH.mobile_sticky.no_padding) {
                            height = maxH.mobile_sticky.no_padding;
                        }

                    } else if (height > maxH.mobile_sticky.init) {
                        height = maxH.mobile_sticky.init;
                    }

                }


                // SET

                if (src) {
                    el.parent().addClass('retina');
                    el.attr('src', src).css('max-height', height + 'px');
                }

            });

        }
    }
    function portfolioActive() {
        var el = $jq('.isotope-filters .filters_wrapper');
        var active = el.attr('data-cat');

        if (active) {
            el.find('li.' + active).addClass('current-cat');
            $jq('.isotope').isotope({ filter: '.category-' + active });
        }
    }
    function mfn_stickyH() {

        if ($jq('body').hasClass('header-below')) {

            // header below slider
            header_H = $jq('.mfn-main-slider').innerHeight() + $jq('#Top_bar').innerHeight();

        } else {

            // default
            header_H = $jq('#Top_bar').innerHeight() + $jq('#Action_bar').innerHeight();

        }
       // alert($jq('#Top_bar').innerHeight());
    }


    /* ---------------------------------------------------------------------------
	 * Header | Sticky | Mobile
	 * --------------------------------------------------------------------------- */

    function mfn_mobile_sticky() {
        if ($jq('body').hasClass('mobile-sticky') && ($jq(window).width() < 768)) {

            var windowH = $jq(window).height();
            var offset = adminBarH() + $jq('#Top_bar .logo').height();

            if ((!$jq('#Top_bar').hasClass('is-sticky')) && $jq('#Action_bar').is(':visible')) {
                offset += $jq('#Action_bar').height();
            }

            var menuH = windowH - offset;
            if (menuH < 176) {
                menuH = 176;
            }

            $jq('#Top_bar #menu').css('max-height', menuH + 'px');

        }
    }


	/* ---------------------------------------------------------------------------
	 * Header | Top bar left | Width
	 * --------------------------------------------------------------------------- */

    function mfn_header() {
        var rightW = $jq('.top_bar_right').innerWidth();
        if (rightW && !$jq('body').hasClass('header-plain')) {
            rightW += 10;
        }
        var parentW = $jq('#Top_bar .one').innerWidth();
        var leftW = parentW - rightW;
        $jq('.top_bar_left, .menu > li > ul.mfn-megamenu').css('width', leftW);
    }


	/* ---------------------------------------------------------------------------
	 * FIX | Header | Sticky | Height
	 * --------------------------------------------------------------------------- */

    function fixStickyHeaderH() {
        var stickyH = 0;

        // FIX | sticky top bar height

        var topBar = $jq('.sticky-header #Top_bar');

        if (topBar.hasClass('is-sticky')) {
            stickyH = $jq('.sticky-header #Top_bar').innerHeight();
        } else {
            topBar.addClass('is-sticky');
            stickyH = $jq('.sticky-header #Top_bar').innerHeight();
            topBar.removeClass('is-sticky');
        }

        // FIX | responsive

        if ($jq(window).width() < mobile_init_W) {

            if ($jq(window).width() < 768) {

                // mobile
                if (!$jq('body').hasClass('mobile-sticky')) {
                    stickyH = 0;
                }

            } else {

                // tablet
                if (!$jq('body').hasClass('tablet-sticky')) {
                    stickyH = 0;
                }

            }

        } else {

            // desktop

            // FIX | header creative
            if ($jq('body').hasClass('header-creative')) {
                stickyH = 0;
            }

        }

        return stickyH;
    }


	/* ---------------------------------------------------------------------------
	 * Sidebar | Height
	 * --------------------------------------------------------------------------- */

    function mfn_sidebar() {
        if ($jq('.with_aside .four.columns').length) {

            var maxH = $jq('#Content .sections_group').outerHeight();

            $jq('.with_aside .four.columns .widget-area').each(function () {
                $jq(this).css('min-height', 0);
                if ($jq(this).height() > maxH) {
                    maxH = $jq(this).height();
                }
            });
            $jq('.with_aside .four.columns .widget-area').css('min-height', maxH + 'px');

        }
    }


	/* ---------------------------------------------------------------------------
	 * Section | Full Screen
	 * --------------------------------------------------------------------------- */

    function mfn_sectionH() {
        var windowH = $jq(window).height();

        // FIX | next/prev section
        var offset = 0;
        if ($jq('.section.full-screen:not(.hide-desktop)').length > 1) {
            offset = 5;
        }

        $jq('.section.full-screen').each(function () {

            var section = $jq(this);
            var wrapper = $jq('.section_wrapper', section);

            section
                .css('padding', 0)
                .css('min-height', windowH + offset);

            var padding = (windowH + offset - wrapper.height()) / 2;

            if (padding < 50) padding = 50;

            wrapper
                .css('padding-top', padding + 10)			// 20 = column margin-bottom / 2
                .css('padding-bottom', padding - 10);
        });
    }

    function mfn_sticky() {
        if ($jq('body').hasClass('sticky-header')) {
            if (!($jq('body').hasClass('header-creative') && window.innerWidth >= 768)) {

                var start_y = header_H;
                var window_y = $jq(window).scrollTop();

                if (window_y > start_y) {

                    if (!($jq('#Top_bar').hasClass('is-sticky'))) {

                        $jq('.header_placeholder').css('height', $jq('#Top_bar').height());

                        $jq('#Top_bar')
                            .addClass('is-sticky')
                            .css('top', -60)
                            .css('position', 'fixed')
                            .animate({
                                'top': adminBarH() + 'px'
                            }, 300, function () {

                            });

                        // Header width
                        mfn_header();
                    }

                } else {

                    if ($jq('#Top_bar').hasClass('is-sticky')) {

                        $jq('.header_placeholder').css('height', 0);
                        $jq('#Top_bar')
                            .removeClass('is-sticky')
                            .css('top', top_bar_top)
                            .css('position', 'static');

                        // Retina Logo - max height
                        sticky_logo();

                        // Header width
                        mfn_header();

                    }

                }

                mfn_mobile_sticky();

            }
        }
    }

    function hashNav() {

        // # window.location.hash
        var hash = window.location.hash;

        if (hash) {

            // FIX | Master Slider
            if (hash.indexOf("&") > -1 || hash.indexOf("/") > -1) {
                return false;
            }

            // Contact Form 7 in popup
            if (hash.indexOf("wpcf7") > -1) {
                cf7popup(hash);
            }

            if ($jq(hash).length) {

                var tabsHeaderH = $jq(hash).siblings('.ui-tabs-nav').innerHeight();

                $jq('html, body').animate({
                    scrollTop: $jq(hash).offset().top - fixStickyHeaderH() - tabsHeaderH - adminBarH()
                }, 500);
            }

        }

    }

    function mfn_introH() {
        var windowH = $jq(window).height() - $jq('#Header_wrapper').height() - adminBarH();

        $jq('#Intro.full-screen').each(function () {

            var el = $jq(this);
            var inner = $jq('.intro-inner', el);

            el.css('padding', 0).css('min-height', windowH);

            var padding = (windowH - inner.height()) / 2;
            inner.css('padding-top', padding).css('padding-bottom', padding);

        });
    }

    function adminBarH() {
        var height = 0;

        // WP adminbar
        if ($jq('body').hasClass('admin-bar')) {
            height += $jq('#wpadminbar').innerHeight();
        }

        // WC demo store
        if ($jq('body').hasClass('woocommerce-demo-store')) {
            height += $jq('body > p.demo_store').innerHeight();
        }

        return height;
    }
    ////////////////////////////////////////////////////////
    $rootScope.pageFunctions = function () {
        retinaLogo();
        // Portfolio - Isotope
        $jq('.blog_wrapper .isotope:not( .masonry ), .portfolio_wrapper .isotope:not( .masonry-flat, .masonry-hover, .masonry-minimal )').isotope({
            itemSelector: '.isotope-item',
            layoutMode: 'fitRows',
            isOriginLeft: rtl ? false : true
        });

        // Portfolio - Masonry Flat
        $jq('.portfolio_wrapper .masonry-flat').isotope({
            itemSelector: '.isotope-item',
            percentPosition: true,
            masonry: {
                columnWidth: 1
            },
            isOriginLeft: rtl ? false : true
        });

        // Blog & Portfolio - Masonry
        $jq('.isotope.masonry, .isotope.masonry-hover, .isotope.masonry-minimal').isotope({
            itemSelector: '.isotope-item',
            layoutMode: 'masonry',
            isOriginLeft: rtl ? false : true
        });

        portfolioActive();
        $jq('.chart').waypoint({

            offset: '100%',
            triggerOnce: true,
            handler: function () {

                var el = $jq(this.element).length ? $jq(this.element) : $jq(this);
                var lineW = simple ? 4 : 8;

                el.easyPieChart({
                    animate: 1000,
                    lineCap: 'circle',
                    lineWidth: lineW,
                    size: 140,
                    scaleColor: false,
                    trackColor: '#f8f8f8'
                });

                if (typeof this.destroy !== 'undefined' && $jq.isFunction(this.destroy)) {
                    this.destroy();
                }
            }
        });

        $jq('.bars_list').waypoint({

            offset: '100%',
            triggerOnce: true,
            handler: function () {

                var el = $jq(this.element).length ? $jq(this.element) : $jq(this);

                el.addClass('hover');

                if (typeof this.destroy !== 'undefined' && $jq.isFunction(this.destroy)) {
                    this.destroy();
                }
            }
        });

        $jq('.progress_icons').waypoint({

            offset: '100%',
            triggerOnce: true,
            handler: function () {

                var el = $jq(this.element).length ? $jq(this.element) : $jq(this);
                var active = el.attr('data-active');
                var color = el.attr('data-color');
                var icon = el.find('.progress_icon');
                var timeout = 200;		// timeout in milliseconds

                icon.each(function (i) {
                    if (i < active) {
                        var time = (i + 1) * timeout;
                        setTimeout(function () {
                            $jq(icon[i])
                                .addClass('themebg')
                                .css('background-color', color);
                        }, time);
                    }
                });

                if (typeof this.destroy !== 'undefined' && $jq.isFunction(this.destroy)) {
                    this.destroy();
                }
            }
        });

        $jq('.animate-math .number').waypoint({

            offset: '100%',
            triggerOnce: true,
            handler: function () {

                var el = $jq(this.element).length ? $jq(this.element) : $jq(this);
                var duration = Math.floor((Math.random() * 1000) + 1000);
                var to = el.attr('data-to');

                $jq({ property: 0 }).animate({ property: to }, {
                    duration: duration,
                    easing: 'linear',
                    step: function () {
                        el.text(Math.floor(this.property));
                    },
                    complete: function () {
                        el.text(this.property);
                    }
                });

                if (typeof this.destroy !== 'undefined' && $jq.isFunction(this.destroy)) {
                    this.destroy();
                }
            }
        });

        $jq('.before_after.twentytwenty-container').twentytwenty();

        // Header | Sticky
        mfn_stickyH();
        mfn_sticky();
        mfn_mobile_sticky();

        // Full Screen Section
        mfn_sectionH();

        // Navigation | Hash
        hashNav();

        // Full Screen Intro
        mfn_introH();

        // FIX | Revolution Slider Width & Height OnLoad
        $jq(window).trigger('resize');

        // Sidebar | Height
        setTimeout(function () {
            mfn_sidebar();
        }, 10);




    };
    $rootScope.dummy_click = function () {

    };

   // $rootScope.pageFunctions();
    $rootScope.onScrollDisabled = false;
    window.onscroll = function () {
      if (!$rootScope.onScrollDisabled)
           scrollFunction();
    };

    function scrollFunction() {
        var y = $jq(window).scrollTop();

        
        var t = Number(y) + 42;
        // alert(left);
        $jq('#header_menu_content').css('top', t + 'px');


        if (y > 80 || y > 80) {
            $jq('#navbar').css('border-bottom','1px solid #ddd');
           // console.log(y);
          // document.getElementById("navbar").style.padding = "30px 10px";
           // $jq('#navbar').height(90);
           // document.getElementById("logo").style.fontSize = "25px";
        } else {
            $jq('#navbar').css('border-bottom', '0px solid #ddd');
           // document.getElementById("navbar").style.padding = "80px 10px";
           // $jq('#navbar').height(145);
            //document.getElementById("logo").style.fontSize = "35px";
        }
    }

    $rootScope.back_bottom = function () {
        $jq("HTML, BODY").animate({ scrollTop: 0 }, 500);
  
    };
    ///////////////////////////////////////////////////////
}]);
 
 
 