 import Vue from 'vue';

 Vue.prototype.msgSuccess = function (msg) {
   this.$message({
     showClose: true,
     message: msg,
     type: "success"
   });
 }

 Vue.prototype.msgError = function (msg) {
   this.$message({
     showClose: true,
     message: msg,
     type: "error"
   });
 }

 Vue.prototype.msgInfo = function (msg) {
   this.$message.info(msg);
 }

 Vue.prototype.msgAlert = function (title, msg) {
   this.$alert(msg, title);
 }