import { BasicEvent } from './basic-event'


export function BasicSubject(initialValue, name) {
    var self = this;
    var onChange = new BasicEvent();

    self.value = initialValue;

    self.asObservable = () => self;

    self.subscribe = (handler, hname) => {
        var binding = onChange.add(handler, name + '.' + hname);
        var v = self.value;
        onChange.run(handler, v);
        return binding;
    }

    self.next = newValue => {
        self.value = newValue;
        onChange.dispatch(newValue);
    }
}
