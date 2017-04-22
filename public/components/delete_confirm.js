var deleteConfirm= 
{
		  templateUrl: 'views/deleteConfirm.html',
		  bindings: {
		    resolve: '<',
		    close: '&',
		    dismiss: '&'
		  },
		  controller: function () {
		    var $ctrl = this;

		    $ctrl.$onInit = function () {
		      $ctrl.repo = $ctrl.resolve.repo;
		    };

		    $ctrl.ok = function () {
		      $ctrl.close();
		    };

		    $ctrl.cancel = function () {
		      $ctrl.dismiss();
		    };
		  }	
		}
