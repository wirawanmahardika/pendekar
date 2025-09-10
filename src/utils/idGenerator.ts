export default function createIdGenerator() {
    let id = Number.MIN_SAFE_INTEGER;
    return () => id++
}