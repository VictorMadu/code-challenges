export function formatNumWithExp(n: number): string {
    let regExp = /(?=^\d|\.\d$)(^(?<digits>\d*)(.(?<decimals>\d+))?([eE](?<exponent>[-+]?\d+))?$)/; // can alse parse: .233, .2, etc

    const groups = <Partial<{ digits: string; decimals: string; exponent: string }>>(
        regExp.exec(n.toString())?.groups
    );
    const digits = groups.digits ?? "0";
    const decimals = groups.decimals ?? "";
    const exponent = +(groups.exponent ?? 0);

    if (exponent === 0 || decimals.length === exponent)
        return digits + (decimals ? "." + decimals : "");
    else if (exponent > 0 && decimals.length < exponent) {
        regExp = new RegExp(`(?<leftDec>\\d{${decimals.length}})(?<rightDec>\\d*)`);
        const groups = <Partial<{ leftDec: number; rightDec: number }>>(
            regExp.exec(decimals)?.groups
        );
        const leftDec = groups.leftDec ?? "";
        const rightDec = groups.rightDec ?? "";

        return digits + leftDec + (rightDec ? "." + rightDec : "");
    } else if (exponent > 0) {
        return digits + decimals.padEnd(exponent);
    } else {
        return "0." + digits.padStart(-exponent, "0") + decimals;
    }
}

console.log("Hello world");

console.assert(formatNumWithExp(1.23451678) === "1.23451678");
console.assert(formatNumWithExp(1.23451678e3) === "1234.51678");
console.assert(formatNumWithExp(1.23451678e8) === "123451678");
console.assert(formatNumWithExp(1.23451678e10) === "12345167800");
console.assert(formatNumWithExp(1.23451678e-8) === "0.0000000123451678");
console.assert(formatNumWithExp(1e9) === "1000000000");
console.assert(formatNumWithExp(100e9) === "100000000000");
console.assert(formatNumWithExp(100e-9) === "0.0000001");
console.assert(formatNumWithExp(1e-9) === "0.000000001");
