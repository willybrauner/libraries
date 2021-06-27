import * as secondary from './list';

const libs = {};
for (const key in secondary) {
  libs[key] = secondary[key];
}
export default libs;
