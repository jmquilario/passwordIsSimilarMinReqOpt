const P = ["kk", "ab", "aa", "zzii", "bigbangt", "password", "hack"];
const countMinOperation = (password) => {
  // ascii [a-z] 97-122
  // vowels
  const v = ["a", "e", "i", "o", "u"]
    .map((c) => c.charCodeAt())
    .sort((a, b) => a - b);
  // consonants
  const c = Array.from({ length: 123 - 97 }, (_, index) => index + 97).filter(
    (n) => !v.includes(n)
  );

  // sorted password vowels in ascii
  const pv = password
    .split("")
    .map((c) => c.charCodeAt())
    .filter((c) => v.includes(c))
    .sort();

  // sorted password consonants in ascii
  const pc = password
    .split("")
    .map((c) => c.charCodeAt())
    .filter((c) => !v.includes(c))
    .sort();

  const isSimilar = pc.length === pv.length;
  // isSimilar && return 0
  if (isSimilar) {
    return "similar";
  }

  const len = password.length;
  const isEven = len % 2 === 0;
  if (!isEven) {
    return -1; // odd number can never be similar
  }

  const diff = Math.abs(len / 2 - pv.length);
  // if manipulation is not needed
  // return diff // number of operation needed to make it equal

  // in case we need to manipulate the char to either con or vow
  const toManipulate = pc.length > pv.length ? "con" : "vow";

  // sorted password in ascii
  const pAscii = password
    .split("")
    .map((c) => c.charCodeAt())
    .sort();

  /*
  console.log("is pwd similar?", isSimilar);
  console.log("can pwd be similar?", isEven);
  console.log(`what will make pwd similar? ${diff} ${toManipulate}`);

  console.log("pwd sorted ascii", pAscii);

  console.log("pwd len", len);
  console.log("vow in ascii", v);
  console.log("pwd vow", pv);
  console.log("pwd con", pc);
*/

  // helper function to get the nearest distance of ascii
  const getNearest = (origin, destination) => {
    return origin > destination ? origin - destination : destination - origin;
  };

  if (toManipulate === "con" && isEven && !isSimilar) {
    const map = [];
    for (let i = 0; i < pc.length; i++) {
      const distance = [];
      for (let j = 0; j < v.length; j++) {
        distance.push(getNearest(pc[i], v[j]));
      }
      //console.log(pc[i], distance);
      // sort and grab the lowest distance
      map.push(distance.sort((a, b) => a - b)[0]);
    }
    //console.log("map", map);

    // sum diff. make sure it is sorted
    // answer
    console.log(
      password,
      map
        .sort()
        .slice(0, diff)
        .reduce((a, b) => a + b, 0)
    );
  }

  if (toManipulate === "vow" && isEven && !isSimilar) {
    const map = [];
    for (let i = 0; i < pv.length || 0; i++) {
      const distance = [];
      for (let j = 0; j < c.length; j++) {
        distance.push(getNearest(pv[i], c[j]));
      }
      // sort and grab the lowest distance
      map.push(distance.sort((a, b) => a - b)[0]);
    }

    // sum diff. make sure it is sorted
    // answer
    console.log(
      password,
      map
        .sort()
        .slice(0, diff)
        .reduce((a, b) => a + b, 0)
    );
  }
};

for (const p of P) {
  countMinOperation(p);
}
