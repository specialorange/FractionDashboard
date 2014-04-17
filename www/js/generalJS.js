// var cfdApp = angular.module('cfd', []);

var appLaunchCount = window.localStorage.getItem('launchCount');

//Check if it already exists or not
if(appLaunchCount){
   //This is a second time launch, and count = applaunchCount
   // console.warn(window.localStorage.getItem('launchCount'));
}else{
  //Local storage is not set, hence first time launch. set the local storage item
  window.localStorage.setItem('launchCount', 1);
  // if ($('div[ui-view=messages]')) {
  //   $('div[ui-view=messages]').html('
  //     <div class="alert alert-success alert-dismissable">
  //       <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
  //       <strong>Well done!</strong> This is the First time you\'ve loaded the CFD app.
  //     </div>
  //   ')
  // }
  // console.warn(window.localStorage.getItem('launchCount'));

  //Do the other stuff related to first time launch
}