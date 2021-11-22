/*
A tiny alternative to `classnames`, `clsx` and `obj-str`.
*/
module.exports = function () {
    var a = arguments,
        o = [],
        k;
    for (k in a) a[k] && o.push(a[k]);
    return o.join(' ') || null;
};
