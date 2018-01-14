/**
 * Created by Allan on 1/27/2015.
 */

function ViewModule() { };

ViewModule.Title = "Leopard Data Services Account Dashboard";
ViewModule.minimal = null;

// page vars

// page controls

ViewModule.ParagraphCurrentAccountBalance = $('#ParagraphCurrentAccountBalance');
ViewModule.ParagraphNextInvoiceDate = $('#ParagraphNextInvoiceDate');

ViewModule.LinkLogout = $('#LinkLogout');

ViewModule.LinkApplyACoupon = $('#LinkApplyACoupon');
ViewModule.LinkCancelService = $('#LinkCancelService');
ViewModule.LinkMyCredits = $('#LinkMyCredits');
ViewModule.LinkDownloadSoftware = $('#LinkDownloadSoftware');
ViewModule.LinkModifyMyAccountLogin = $('#LinkModifyMyAccountLogin');
ViewModule.LinkManagePaymentMethods = $('#LinkManagePaymentMethods');
ViewModule.LinkActivateServices = $('#LinkActivateServices');
ViewModule.LinkReportABug = $('#LinkReportABug');
ViewModule.LinkReportASiteProblem = $('#LinkReportASiteProblem');
ViewModule.LinkRequestASalesCall = $('#LinkRequestASalesCall');
ViewModule.LinkServicesSupportOptions = $('#LinkServicesSupportOptions');
ViewModule.LinkTermsOfService = $('#LinkTermsOfService');
ViewModule.LinkUpdateBusinessAccountInformation = $('#LinkUpdateBusinessAccountInformation');
ViewModule.LinkUpdateMyPersonalAccountInformation = $('#LinkUpdateMyPersonalAccountInformation');
ViewModule.LinkViewInvoices = $('#LinkViewInvoices');
ViewModule.LinkViewPaymentHistory = $('#LinkViewPaymentHistory');
ViewModule.LinkViewMyServiceStatistics = $('#LinkViewMyServiceStatistics');

ViewModule.Initialize = function(minimal) {
    var self = this;

    self.minimal = minimal;

    // load page control references

    // initialize initial control state

    // load up events

    ViewModule.LinkLogout.click(function(event) {
        ViewModule.minimal.navigateToPage('loggedout', true);
        application.LogOut();
    });

    ViewModule.LinkApplyACoupon.click(function() {
        minimal.navigateToPage('applyacoupon', true);
    });

    ViewModule.LinkCancelService.click(function() {
        minimal.navigateToPage('cancelservice', true);
    });

    ViewModule.LinkMyCredits.click(function() {
        minimal.navigateToPage('credits', true);
    });

    ViewModule.LinkDownloadSoftware.click(function() {
        minimal.navigateToPage('downloadsoftware', true);
    });

    ViewModule.LinkModifyMyAccountLogin.click(function() {
        minimal.navigateToPage('modifyldlogin', true);
    });

    ViewModule.LinkManagePaymentMethods.click(function() {
        minimal.navigateToPage('managepaymentmethods', true);
    });

    ViewModule.LinkActivateServices.click(function() {
        minimal.navigateToPage('activateservices', true);
    });

    ViewModule.LinkReportABug.click(function() {
        minimal.navigateToPage('reportabug', true);
    });

    ViewModule.LinkReportASiteProblem.click(function() {
        minimal.navigateToPage('reportsiteproblem', true);
    });

    ViewModule.LinkRequestASalesCall.click(function() {
        minimal.navigateToPage('requestasalescall', true);
    });

    ViewModule.LinkServicesSupportOptions.click(function() {
        minimal.navigateToPage('servicesupportoptions', true);
    });

    ViewModule.LinkTermsOfService.click(function() {
        minimal.navigateToPage('termsofservice', true);
    });

    ViewModule.LinkUpdateBusinessAccountInformation.click(function() {
        minimal.navigateToPage('updatebusinessaccountinformation', true);
    });

    ViewModule.LinkUpdateMyPersonalAccountInformation.click(function() {
        minimal.navigateToPage('updatepersonalaccountinformation', true);
    });

    ViewModule.LinkViewInvoices.click(function() {
        minimal.navigateToPage('viewinvoices', true);
    });

    ViewModule.LinkViewPaymentHistory.click(function() {
        minimal.navigateToPage('viewpayments', true);
    });

    ViewModule.LinkViewMyServiceStatistics.click(function() {
        minimal.navigateToPage('viewservicestatistics', true);
    });

    var objectToSend = {};

    objectToSend.securityuserid = application.loggedInUserID;

    postAjaj('/ajaj/RetrieveCurrentAccountBalance', objectToSend, function (returnObject) {
        if (returnObject.result == true) {

            var balanceText = numeral(returnObject.outData.balance).format('$0,0.00');

            if (returnObject.outData.balance > 0) {
                balanceText += " (Your account has a credit!)";
            }
            else {
                balanceText += " (Current Owed Balance)";
            }

            ViewModule.ParagraphCurrentAccountBalance.text(balanceText);
        }
        else {
            ViewModule.ParagraphCurrentAccountBalance.text('Oops!  Something went wrong, please contact Leopard Support at 866-305-0223');
        }
    });

    postAjaj('/ajaj/RetrieveNextAccountInvoiceDate', objectToSend, function (returnObject) {
        if (returnObject.result == true) {
            ViewModule.ParagraphNextInvoiceDate.text(returnObject.outData.date);
        }
        else {
            ViewModule.ParagraphNextInvoiceDate.text('Oops!  Something went wrong, please contact Leopard Support at 866-305-0223');
        }
    });

};

ViewModule.Deinitialize = function() {
    var self = this;
};