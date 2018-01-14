
function ModuleView (ModuleViewID, SecurityUserID, Name, Occurred) {
    this.ModuleViewID = null;
    this.SecurityUserID = null;
    this.Name = null;
    this.Occurred = null;
}

function SecurityUser (SecurityUserID, ExternalSecurityUserID, SubUserOfSecurityUserID) {
    this.SecurityUserID = null;
    this.ExternalSecurityUserID = null;
    this.SubUserOfSecurityUserID = null;
}
module.exports.ModuleView = ModuleView;

module.exports.SecurityUser = SecurityUser;

