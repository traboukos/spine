describe("Class", function(){
  var User;
  
  beforeEach(function(){
    User = Spine.Class.create();
  });
  
  it("is sane", function(){
    expect(Spine).toBeTruthy();
  });
  
  it("can create subclasses", function(){
    User.extend({classProperty: true});
    
    var Friend = User.create();
    expect(Friend).toBeTruthy();
    expect(Friend.classProperty).toBeTruthy();
  });
  
  it("can create instance", function(){
    User.include({instanceProperty: true})
    
    var Bob = User.init();
    expect(Bob).toBeTruthy();
    expect(Bob.instanceProperty).toBeTruthy();
  });
  
  it("calls instances' initializer", function(){
    spyOn(User.fn, "init");
    User.init();
    expect(User.fn.init).toHaveBeenCalled();
  });
  
  it("can be extendable", function(){
    User.extend({
      classProperty: true
    });
    
    expect(User.classProperty).toBeTruthy();
  });
  
  it("can be includable", function(){
    User.include({
      instanceProperty: true
    });
    
    expect(User.prototype.instanceProperty).toBeTruthy();
    expect(User.init().instanceProperty).toBeTruthy();
  });

  it("can be mixinable", function(){
    User.include({
      instanceProperty1: false,
      instanceProperty2: false,
      changeInstanceProperty: function(){
        this.instanceProperty1 = true;
      }
    });

    User.extend({
      classProperty1: false,
      classProperty2: false,
      changeClassProperty: function(){
        this.classProperty1 = true;
      }
    });

    User.extend

    var instanceMixin = {
      changeInstanceProperty: function(){
        this.instanceProperty2 = true;
      }
    };

    var classMixin = {
      changeClassProperty: function(){
        this.classProperty2 = true;
      }
    }

    User.mixin(instanceMixin,classMixin);

    var user = User.init();
    user.changeInstanceProperty();
    User.changeClassProperty();

    expect(user.instanceProperty1).toBeTruthy();
    expect(user.instanceProperty2).toBeTruthy();

    expect(User.classProperty1).toBeTruthy();
    expect(User.classProperty2).toBeTruthy();    
  });
  
  it("should trigger module callbacks", function(){
    var module = {
      included: function(){}, 
      extended: function(){}
    };
    
    spyOn(module, "included");
    User.include(module);
    expect(module.included).toHaveBeenCalled();
    
    spyOn(module, "extended");
    User.extend(module);
    expect(module.extended).toHaveBeenCalled();    
  });
  
  it("should trigger inheritance callbacks", function(){
    spyOn(User, "inherited");
    var Friend = User.create();    
    expect(User.inherited).toHaveBeenCalled();    
  });
  
  it("can proxy functions", function(){
    User.extend({
      weirdScope: function(){ return this }
    });
    
    expect(User.weirdScope()).toBe(User);
    
    var scope = {};
    expect(User.weirdScope.apply(scope)).toBe(scope);
    expect(User.proxy(User.weirdScope).apply(scope)).toBe(User);
  });
  
  it("can rewrite proxy functions", function(){
    User.extend({
      weirdScope: function(){ return this }
    });
    
    expect(User.weirdScope()).toBe(User);
    User.proxyAll("weirdScope");
    expect(User.weirdScope.apply({})).toBe(User);
  });
});