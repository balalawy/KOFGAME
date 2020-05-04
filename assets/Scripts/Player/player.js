/**
 * 人物控制逻辑
 */

const Input = {};  // 保存输入
const State = {
    stand:1,
    attack:2
} ;               // 标记人物状态

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._speed = 200;                                       // 最大移动速度
        this._speed_direction = cc.v2(0, 0);                     // 当前移动速度

        this.playerState = State.stand;                          // 玩家状态
        this.animate = 'Idle';                                   // 人物动画
        this.playerAni = this.node.getComponent(cc.Animation);   // 人物当前动画

        cc.systemEvent.on('keydown', this.onKeydown, this);      // 绑定按键监听事件
        cc.systemEvent.on('keyup', this.onKeyup, this);
    },

    onDestroy(){
        cc.systemEvent.off('keydown', this.onKeydown, this);     // 解绑按键监听
        cc.systemEvent.off('keyup', this.onKeyup, this);
    },


    // function:
    //  当按键按下时，将对应按键设为1
    // params:
    //  e:事件
    onKeydown:function(e){
        Input[e.keyCode] = 1;
    },


    // function:
    //  当按键松开时，将对应按键设为0
    // params:
    //  e:事件
    onKeyup:function(e){
        Input[e.keyCode] = 0;
    },


    // function:
    //  设置人物动画
    // params:
    //  animation:需要设置的动画名称
    // return:
    //  null
    setAnimation(animation){
        if(this.animate == animation){
            return;
        }

        this.animate = animation;
        this.playerAni.play(animation);
    },


    // function:
    //  控制人物移动
    // params:null
    // return:null
    moveController(){
        // region 控制人物前进移动

        let animation = this.animate;

        let scaleX = Math.abs(this.node.scaleX);                            // 人物方向的绝对值
        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;      // 刚体速度

        if(Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]){
            this._speed_direction.x = -1;                                   // 人物方向
            this.node.scaleX = -scaleX;                                     // 旋转人物方向
            animation = "Forward";                                          // 设置前进动画
        }else if(Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]){
            this._speed_direction.x = 1;
            this.node.scaleX = scaleX;
            animation = "Forward";                                          // 设置前进动画
        }else{
            this._speed_direction.x = 0;
            animation = "Idle";                                             // 设置初始动画
        }

        if(this._speed_direction){
            this.lv.x = this._speed_direction.x * this._speed;              // 设置人物x轴速度
        }else{
            this.lv.x = 0;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;      // 修改人物x轴速度

        if(animation){
            this.setAnimation(animation);                                   // 启动动画
        }

        // endregion
    
    },


    start () {

    },


    update (dt) {

        // 控制人物移动
        this.moveController();

    },
});
