apt-get --quiet update --yes
apt-get --quiet install --yes wget tar unzip lib32stdc++6 lib32z1
wget --quiet --output-document=android-sdk.zip https://dl.google.com/android/repository/sdk-tools-linux-${ANDROID_SDK_TOOLS}.zip
unzip -d android-sdk-linux android-sdk.zip
echo y | android-sdk-linux/tools/bin/sdkmanager "platforms;android-${ANDROID_COMPILE_SDK}" >/dev/null
echo y | android-sdk-linux/tools/bin/sdkmanager "platform-tools" >/dev/null
echo y | android-sdk-linux/tools/bin/sdkmanager "build-tools;${ANDROID_BUILD_TOOLS}" >/dev/null
export ANDROID_HOME=$PWD/android-sdk-linux
export PATH=$PATH:$PWD/android-sdk-linux/platform-tools/
chmod +x ./gradlew
    # temporarily disable checking for EPIPE error and use yes to accept all licenses
yes | android-sdk-linux/tools/bin/sdkmanager --licenses
./gradlew assembleRelease