export function timeToSeconds(timeString: string): number {
    const timeParts = timeString.split(':').map(part => parseInt(part, 10));
    let totalSeconds = 0;
    if (timeParts.length === 3) { // Format: hh:mm:ss
      totalSeconds += timeParts[0] * 3600;
      totalSeconds += timeParts[1] * 60;
      totalSeconds += timeParts[2];
    } else if (timeParts.length === 2) { // Format: mm:ss
      totalSeconds += timeParts[0] * 60;
      totalSeconds += timeParts[1];
    } else if (timeParts.length === 1) { // Format: ss
      totalSeconds += timeParts[0];
    } else {
      throw new Error(`Invalid time format: ${timeString}`);
    }
    return totalSeconds;
}

export function percentToSeconds(percent: number, totalSeconds: number): number {
    return (percent / 100) * totalSeconds;
}

export function secondsToTime(duration: number): string {
    if (duration < 3600) {
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}
