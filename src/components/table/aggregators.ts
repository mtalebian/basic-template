// This is a custom aggregator that
// takes in an array of leaf values and
// returns the rounded median
export function roundedMedian(leafValues: any) {
    let min = leafValues[0] || 0;
    let max = leafValues[0] || 0;

    leafValues.forEach((value: any) => {
        min = Math.min(min, value);
        max = Math.max(max, value);
    });

    return Math.round((min + max) / 2);
}
