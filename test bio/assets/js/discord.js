document.addEventListener('DOMContentLoaded', () => {
    const userId = "1562881347960311880"; // Discord ID của bạn

    const discordAvatar = document.getElementById('discord-avatar');
    const discordUsername = document.getElementById('discord-username');
    const discordStatusDot = document.getElementById('discord-status-dot');
    const discordStatusText = document.getElementById('discord-status-text');
    const discordActivityInfo = document.getElementById('discord-activity-info');
    const discordNoActivity = document.getElementById('discord-no-activity');

    // Cập nhật dữ liệu từ Lanyard API
    function updateDiscordData() {
        fetch(`https://api.lanyard.rest/v1/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data) {
                    const userData = data.data;

                    // Cập nhật tên Discord
                    if (userData.username && discordUsername) {
                        discordUsername.textContent = userData.username;
                        console.log("✓ Username updated:", userData.username);
                    }

                    // Cập nhật avatar Discord
                    if (userData.discord_user && userData.discord_user.avatar && discordAvatar) {
                        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${userData.discord_user.avatar}.png?size=512`;
                        discordAvatar.src = avatarUrl;
                        console.log("✓ Avatar updated");
                    }

                    // Cập nhật trạng thái
                    const status = userData.discord_status || 'offline';
                    if (discordStatusDot) {
                        discordStatusDot.className = `discord-status-${status}`;
                    }
                    
                    const statusText = {
                        'online': 'Online',
                        'idle': 'Idle',
                        'dnd': 'Do Not Disturb',
                        'offline': 'Offline'
                    };
                    
                    if (discordStatusText) {
                        discordStatusText.textContent = statusText[status] || 'Offline';
                        console.log("✓ Status updated:", status);
                    }

                    // Cập nhật Activity
                    if (userData.activities && userData.activities.length > 0) {
                        const activity = userData.activities[0];
                        
                        if (discordActivityInfo) {
                            discordActivityInfo.style.display = 'block';
                        }
                        if (discordNoActivity) {
                            discordNoActivity.style.display = 'none';
                        }

                        // Activity name
                        const activityName = document.getElementById('discord-activity-name');
                        if (activityName) {
                            activityName.textContent = activity.name || '';
                        }

                        // Activity details
                        const activityDetails = document.getElementById('discord-activity-details');
                        if (activityDetails) {
                            activityDetails.textContent = activity.details || '';
                        }

                        // Activity state
                        const activityState = document.getElementById('discord-activity-state');
                        if (activityState) {
                            activityState.textContent = activity.state || '';
                        }

                        // Album art
                        if (activity.assets && activity.assets.large_image) {
                            const albumArt = document.getElementById('discord-album-art');
                            if (albumArt) {
                                albumArt.style.backgroundImage = `url('https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png')`;
                            }
                        }

                        console.log("✓ Activity updated:", activity.name);
                    } else {
                        if (discordActivityInfo) {
                            discordActivityInfo.style.display = 'none';
                        }
                        if (discordNoActivity) {
                            discordNoActivity.style.display = 'block';
                        }
                    }
                }
            })
            .catch(error => {
                console.error("❌ Lỗi kết nối Lanyard API:", error);
                console.log("💡 Hướng dẫn cài đặt:");
                console.log("1. Vào https://lanyard.rest/");
                console.log("2. Invite bot Lanyard vào Discord server của bạn");
                console.log("3. Chờ 1-2 phút để Lanyard thu thập dữ liệu");
                
                if (discordActivityInfo) {
                    discordActivityInfo.style.display = 'none';
                }
                if (discordNoActivity) {
                    discordNoActivity.style.display = 'block';
                }
            });
    }

    // Cập nhật lần đầu và mỗi 10 giây
    updateDiscordData();
    setInterval(updateDiscordData, 10000);
});