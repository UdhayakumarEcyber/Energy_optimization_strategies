export function formatNumber(receivedValue : string, includeDecimals = true) {
    if (isNaN(parseFloat(receivedValue))) return "Invalid Number";
  
    // Convert number to float and format
    let formattedNumber = parseFloat(receivedValue).toLocaleString("en-US", {
        minimumFractionDigits: includeDecimals ? 2 : 0,
        maximumFractionDigits: includeDecimals ? 2 : 0,
    });
  
    return formattedNumber;
}