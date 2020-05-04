/**
 * 游戏主控制器
 * 控制重要逻辑
 */

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let physis = cc.director.getPhysicsManager();   // 获得物理系统组件
        physis.enabled = true;                          // 开启物理系统
        physis.debugDrawFlags = true;                   // 开启绘制调试信息   

    },

    start () {

    },

    // update (dt) {},
});
