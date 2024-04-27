@echo off
set "shortcutName=Flyff.lnk"
set "targetPath=%~dp0\flyffStart.vbs"
set "startInPath=%~dp0"
set "iconPath=%~dp0\assets\favicon.ico" 

powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%shortcutName%'); $Shortcut.TargetPath = '%targetPath%'; $Shortcut.WorkingDirectory = '%startInPath%'; $Shortcut.IconLocation = '%iconPath%'; $Shortcut.Save()"
