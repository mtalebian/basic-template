
export function BasicEvent() {
    var self = this;
    var handlers = [];

    self.add = (handler, name) => {
        handler.__name = name;
        handlers.push(handler);
        //console.log('>> >> add ' + handler.__name, handlers.length);
        return {
            remove: () => self.remove(handler),
            unsubscribe: () => self.remove(handler),
        };
    }

    self.remove = handler => {
        var list = [];
        for (var i = 0; i < handlers.length; i++) {
            var h = handlers[i];
            if (h !== handler) {
                list.push(h);
            }
        }
        handlers = list;
        //console.log('>> >> remove ' + handler.__name, handlers.length);
    }

    self.dispatch = (...args) => {
        var list = [...handlers];
        for (let i = 0; i < list.length; i++) {
            this.run(list[i], ...args);
        }
    }

    self.run = (handler, ...args) => {
        //console.log(`>> >> ${handler.__name}`, args[0]);
        //handler(...args);
        setTimeout(() => { handler(...args) }, 0);
    }
}
